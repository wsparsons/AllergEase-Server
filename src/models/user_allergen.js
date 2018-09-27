const db = require("../db");
const allergensModel = require("./allergens");

function getAllUserAllergen(userId) {
  return db("user_allergen")
    .where({ user_id: userId })
    .join("allergens", "allergen_id", "allergens.id")
    .then(userAllergens => {
      let promises = userAllergens.map(allergen => {
        return db("aliases")
          .where({ allergen_id: allergen.allergen_id })
          .then(aliases => {
            allergen.aliases = aliases.map(alias => {
              return { description: alias.description, id: alias.id };
            });
            return allergen;
          });
      });
      console.log(userAllergens);
      return Promise.all(promises);
    });
}

module.exports = {
  getAllUserAllergen
};
