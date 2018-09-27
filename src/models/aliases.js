const db = require("../db");
const {
  isValidAliasCreate,
  isValidAliasUpdate
} = require("../errorHandling/bodyInspect");

function findAllergenAliases(id) {
  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));

  return db("allergens")
    .where({ id })
    .select("id", "allergy")
    .first()
    .then(foundAllergen => {
      if (!foundAllergen) throw new Error("allergenNotFound");

      return db("aliases")
        .where({ allergen_id: foundAllergen.id })
        .select("id", "description")
        .then(alias => {
          foundAllergen.aliases = alias;
          return foundAllergen;
        });
    });
}

async function createAllergenAlias(id, body) {
  isValidAliasCreate(body);
  const fields = ["description"];

  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));
  if (!fields.every(field => body[field]))
    return Promise.reject(new Error("aliasFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("aliasFieldRequired"));

  return await findAllergenAliases(id).then(response => {
    return db("aliases")
      .insert({ ...body, allergen_id: response.id })
      .returning(["*"]);
  });
}

async function updateAllergenAlias(id, aliasId, body) {
  isValidAliasUpdate(body);

  const fields = ["description"];

  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("allergenNotFound"));
  if (!Number.isInteger(aliasId) || aliasId < 0 || !aliasId)
    return Promise.reject(new Error("aliasNotFound"));
  if (!Object.keys(body).length === 0)
    return Promise.reject(new Error("aliasFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("aliasFieldRequired"));

  
  return await findAllergenAliases(id).then(response => {
    return db("aliases")
      .where({ allergen_id: response.id, id: aliasId })
      .update({...body, updated_at: new Date()})
      .returning(["*"]);
  });
}

module.exports = {
  findAllergenAliases,
  createAllergenAlias,
  updateAllergenAlias
};
