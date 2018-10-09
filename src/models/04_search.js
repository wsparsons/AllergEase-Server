const axios = require("axios");
const userAllergenModel = require("./03_user_allergen");

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
    ele.aliases.forEach(alias => result.push(`${alias}s`.toLowerCase()));
  });

  return result;
};

async function getUsdaListItem(barcode) {
  let usdaApiKey = `${process.env.USDA_API}`;
  let usdaBarcodeRequest = await axios.get(
    `https://api.nal.usda.gov/ndb/search/?format=json&api_key=${usdaApiKey}&q=${barcode}`
  );
  if (!usdaBarcodeRequest.data.list) {
    return Promise.reject(new Error("usdaProductNotFound"));
  }
  let usdaListItem = usdaBarcodeRequest.data.list.item[0];

  return usdaListItem;
}

async function findBingProductImage(productManufacturer, productName) {
  let bingSubscriptionKey = `${process.env.BING_KEY}`;
  let bingSearchName = `${productManufacturer} ${productName}`;
  let bingImageSearch = await axios.get(
    `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${bingSearchName}&count=5&offset=0&mkt=en-us&safeSearch=Strict`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": bingSubscriptionKey
      }
    }
  );
  let bingImageThumbnailUrl = bingImageSearch.data.value[0].thumbnailUrl;

  return bingImageThumbnailUrl;
}

async function getUsdaItemInfo(usdaNdbno) {
  let usdaApiKey = `${process.env.USDA_API}`;
  let usdaNdbnoRequest = await axios.get(
    `https://api.nal.usda.gov/ndb/V2/reports?type=f&format=json&api_key=${usdaApiKey}&ndbno=${usdaNdbno}`
  );
  let productObject = usdaNdbnoRequest.data.foods[0].food;

  return productObject;
}

async function findProductValence(userId, body) {
  let { barcode } = body;

  if (
    !userId ||
    typeof userId !== "number" ||
    !Number.isFinite(userId) ||
    !Number.isInteger(userId)
  )
    return Promise.reject(new Error("unauthorizedAccess"));

  if (!barcode) return Promise.reject(new Error("barcodeRequired"));

  let usdaListItem = await getUsdaListItem(barcode);

  let productManufacturer = usdaListItem.manu;
  let productName = usdaListItem.name;
  let bingImage = await findBingProductImage(productManufacturer, productName);

  let productNdbno = usdaListItem.ndbno;
  let productObject = await getUsdaItemInfo(productNdbno);

  let foundProduct = {
    name: productObject.desc.name,
    ndbno: productObject.desc.ndbno,
    barcode: barcode,
    ingredients: productObject.ing.desc,
    manufacturer: productObject.desc.manu,
    image: bingImage
  };

  let arrayOfIngredients = await splitString(foundProduct.ingredients);
  let userAllergens = await userAllergenModel.getAllUserAllergens(userId);
  let userAllergensArray = await arrayOfAllergies(userAllergens);

  let foundValence = arrayOfIngredients.some(ele =>
    userAllergensArray.includes(ele)
  );

  let response = { valence: foundValence, product: foundProduct };

  return response;
}

module.exports = {
  findProductValence
};
