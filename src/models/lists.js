const axios = require("axios");
const productsModel = require('./products')
const userAllergenModel = require("./user_allergen");

const splitString = string => {
  const customSplit = delimiter => (acc, ele) => [
    ...acc,
    ...ele.split(delimiter)
  ];

  let splitStringByCommas = string.split(",");
  let arrayOfSplitString = splitStringByCommas
    .reduce(customSplit(";"), [])
    .reduce(customSplit(","), [])
    .reduce(customSplit("("), [])
    .reduce(customSplit(")"), [])
    .reduce(customSplit("{"), [])
    .reduce(customSplit("}"), [])
    .reduce(customSplit("["), [])
    .reduce(customSplit("]"), [])
    .reduce(customSplit("."), [])
    .map(ele => ele.trim())
    .map(ele => ele.replace("*", ""))
    .map(ele => ele.toLowerCase())
    .filter(ele => ele);

  return arrayOfSplitString;
};

const arrayOfAllergies = allergens => {
  let result = [];

  allergens.forEach(ele => {
    if (ele.allergy) {
      result.push(ele.allergy.toLowerCase());
      result.push(`${ele.allergy}s`.toLowerCase());
    }
    ele.aliases.forEach(alias => result.push(alias.toLowerCase()));
    ele.aliases.forEach(alias => result.push(`${alias}s`.toLowerCase()))
  });

  return result;
};

async function findProductValence(userId, body) {
  let { barcode } = body;
  let usdaApiKey = `${process.env.USDA_API}`

  let usdaBarcodeRequest = await axios.get(
    `https://api.nal.usda.gov/ndb/search/?format=json&api_key=${usdaApiKey}&q=${barcode}`
  );

  if (!usdaBarcodeRequest.data.list) {
    return Promise.reject(new Error("usdaProductNotFound"));
  }

  let usdaNdbno = usdaBarcodeRequest.data.list.item[0].ndbno;
  let usdaNdbnoRequest = await axios.get(
    `https://api.nal.usda.gov/ndb/V2/reports?type=f&format=json&api_key=${usdaApiKey}&ndbno=${usdaNdbno}`
  );

  let bingProductName = usdaBarcodeRequest.data.list.item[0].name;
  let bingProductManu = usdaBarcodeRequest.data.list.item[0].manu;
  let bingSearchName = `${bingProductManu} ${bingProductName}`;
  let bingSubscriptionKey = `${process.env.BING_KEY}`;

  let bingImageSearch = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${bingSearchName}&count=5&offset=0&mkt=en-us&safeSearch=Strict`, {headers: {
    "Ocp-Apim-Subscription-Key": bingSubscriptionKey
  }});
  let bingImageThumbnailUrl = bingImageSearch.data.value[0].thumbnailUrl
  

  let productObject = usdaNdbnoRequest.data.foods[0].food;
  let productDesc = productObject.desc;

  let foundProduct = {
    name: productDesc.name,
    ndbno: productDesc.ndbno,
    barcode: barcode,
    ingredients: productObject.ing.desc,
    manufacturer: productDesc.manu,
    image: bingImageThumbnailUrl
  };

  let product = await productsModel.createProduct(foundProduct);
  let arrayOfIngredients = await splitString(foundProduct.ingredients);

  let userAllergy = await userAllergenModel.getAllUserAllergens(userId);
  let userArrayAllergy = await arrayOfAllergies(userAllergy);

  let foundValence = arrayOfIngredients.some(ele =>
    userArrayAllergy.includes(ele)
  );

  let response = { valence: foundValence, product: foundProduct };

  return response;
}

module.exports = {
  findProductValence
};
