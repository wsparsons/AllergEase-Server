const db = require("../db");

function getAllAllergensAliases() {
  return db("allergens")
    .select("id", "allergy")
    .then(allergens => {
      const promises = allergens.map(allergen => {
        return db("aliases")
          .where({ allergen_id: allergen.id })
          .select("id", "description")
          .then(alias => {
            allergen.aliases = alias;
            return allergen;
          });
      });
      return Promise.all(promises);
    });
}

module.exports = {
  getAllAllergensAliases
};
