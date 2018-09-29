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

module.exports = {
  findProductValence
};
