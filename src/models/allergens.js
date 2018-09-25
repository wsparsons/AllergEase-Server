const db = require("../db");

function getAllAllergens() {
  return db("allergens").select("id", "allergy");
  // .then(allergens => {
  //   const promises = allergens.map(allergen => {
  //     return db("aliases")
  //       .where({ allergen_id: allergen.id })
  //       .select("id", "description")
  //       .then(alias => {
  //         allergen.aliases = alias;
  //         return allergen;
  //       });
  //   });
  //   return Promise.all(promises);
  // });
}

function findAllergen(id) {
  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));

  return db("allergens")
    .where({ id })
    .select("id", "allergy")
    .first()
    .then(foundAllergen => {
      if (!foundAllergen) throw new Error("allergenNotFound");

      // return db("aliases")
      //   .where({ allergen_id: foundAllergen.id })
      //   .select("id", "description")
      //   .then(alias => {
      // foundAllergen.aliases = alias;
      return foundAllergen;
      //   });
    });
}

function createAllergen(body) {
  const fields = ["allergy"];
  if (!fields.every(field => body[field]))
    return Promise.reject(new Error("allergyFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("allergyFieldRequired"));

  return db("allergens")
    .insert(body)
    .returning(["*"]);
}

function updateAllergen(id, body) {
  const fields = ["allergy"];
  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));
  if (!fields.every(field => body[field]))
    return Promise.reject(new Error("allergyFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("allergyFieldRequired"));

  return findAllergen(id).then(response => {
    return db("allergens")
      .update({ ...body })
      .returning(["*"]);
  });
}

function deleteAllergen(id) {
  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));

  return findAllergen(id).then(response => {
    return db("allergens")
      .where({ id })
      .del()
      .returning(["*"]);
  });
}

module.exports = {
  getAllAllergens,
  findAllergen,
  createAllergen,
  updateAllergen,
  deleteAllergen
};
