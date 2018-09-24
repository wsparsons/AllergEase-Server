const knex = require("../db");

function getAllAllergens() {
  return (
    knex("allergens")
      .then(allergens => {
        const promises = allergens.map(allergen => {
          return knex('descriptions')
          .select('descriptions.id', 'descriptions.description')
          .join('allergen_description', 'descriptions.id', 'description_id')
          .where({allergen_id: allergen.id})
          .then(allergenDescriptions => {
            allergen.descriptions = allergenDescriptions
            return allergen
          })
        })
        return Promise.all(promises)
      })
      // .inner('allergen_description', 'allergens.id', 'allergen_id')
      // .then(response => {
      //   return response;
      // })
  );
}

module.exports = {
  getAllAllergens
};
