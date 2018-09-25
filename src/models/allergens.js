const db = require("../db");
const {
  isValidAllergenCreate,
  isValidAllergenUpdate
} = require("../errorHandling/bodyInspect");

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

async function createAllergen(body) {
  isValidAllergenCreate(body);

  const fields = ["allergy"];

  if (!fields.every(field => body[field]))
    return Promise.reject(new Error("allergenFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("allergenFieldRequired"));

  return await db("allergens")
    .insert(body)
    .returning(["*"]);
}

async function updateAllergen(id, body) {
  isValidAllergenUpdate(body);

  const fields = ["allergy"];

  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));
  if (!Object.keys(body).length === 0)
    return Promise.reject(new Error("allergenFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("allergenFieldRequired"));

  return await findAllergen(id).then(response => {
    return db("allergens")
      .where({ id })
      .update({ ...response, ...body, updated_at: new Date() })
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
