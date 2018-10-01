const axios = require("axios");
const productsModel = require("./products");
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
    }
    ele.aliases.forEach(alias => result.push(alias.toLowerCase()));
  });

  return result;
};

async function findProductValence(userId, body) {
  let { barcode } = body;

  let usdaBarcodeRequest = await axios.get(
    `${process.env.USDA_URL_SEARCH}${barcode}`
  );

  if (!usdaBarcodeRequest.data.list) {
    return Promise.reject(new Error("usdaProductNotFound"));
  }

  let usdaNdbno = usdaBarcodeRequest.data.list.item[0].ndbno;
  let usdaNdbnoRequest = await axios.get(
    `${process.env.USDA_URL_NDBNO}${usdaNdbno}`
  );

  let bingProductName = usdaBarcodeRequest.data.list.item[0].name;
  let bingProductManu = usdaBarcodeRequest.data.list.item[0].manu;
  let bingSearchName = `${bingProductManu} ${bingProductName}`;
  let bingSubscriptionKey = `${process.env.BING_KEY}`;

  let bingImageSearch = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${bingSearchName}&count=5&offset=0&mkt=en-us&safeSearch=Strict`, {headers: {
    "Ocp-Apim-Subscription-Key": bingSubscriptionKey
  }});

  
  let bingImageThumbnailUrl = bingImageSearch.data.value[0].thumbnailUrl
  
  console.log(bingImageThumbnailUrl);

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
  let arrayOfIngredients = await splitString(product[0].ingredients);

  let userAllergy = await userAllergenModel.getAllUserAllergens(userId);
  let userArrayAllergy = await arrayOfAllergies(userAllergy);

  let foundValence = arrayOfIngredients.some(ele =>
    userArrayAllergy.includes(ele)
  );

  let response = { valence: foundValence };

  return response;
}

module.exports = {
  findProductValence
};
