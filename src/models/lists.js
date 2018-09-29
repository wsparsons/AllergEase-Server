const axios = require('axios')
const productsModel = require("./products");
const userAllergenModel = require("./user_allergen");

const splitString = (string) => {
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

  return arrayOfSplitString
}

const arrayOfAllergies = (allergens) => {
  let result = [];

    allergens.forEach(ele => {
      if (ele.allergy) {
        result.push(ele.allergy.toLowerCase());
      }
      ele.aliases.forEach(alias => result.push(alias.toLowerCase()));
    });

    return result;
}

async function findProductValence(userId, body) {
  let product = await productsModel.createProduct(body);
  let productIngredients = product[0].ingredients;
  let arrayOfIngredients = splitString(productIngredients)

  let userAllergy = await userAllergenModel.getAllUserAllergens(userId);
  let userArrayAllergy = arrayOfAllergies(userAllergy);


  let foundValence = arrayOfIngredients.some(ele => userArrayAllergy.includes(ele));

  return foundValence;
}

async function findUSDABarcode({barcode}) {
  if(!Number.isInteger(barcode) || !barcode) return Promise.reject(new Error('barcodeRequired'))

  let usdaBarcodeRequest = await axios.get(`${process.env.USDA_URL}&q=${barcode}`)

  if(!usdaBarcodeRequest.data.list){
    return Promise.reject(new Error('usdaProductNotFound'))
  }

  let usdaNdbnoRequest = usdaBarcodeRequest.data.list.item[0].ndbno
  
  let usda
}

module.exports = {
  findProductValence,
  findUSDABarcode
};
