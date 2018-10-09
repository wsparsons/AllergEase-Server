const db = require("../db");

function getAllUserAllergens(userId) {
  return db("user_allergen")
    .select("user_allergen.id AS id", "allergens.allergy", "user_allergen.*")
    .where({ user_id: userId })
    .join("allergens", "allergen_id", "allergens.id")
    .then(userAllergens => {
      let promises = userAllergens.map(allergen => {
        return db("aliases")
          .where({ allergen_id: allergen.allergen_id })
          .then(aliases => {
            allergen.aliases = aliases.map(alias => {
              return alias.description;
            });
            return allergen;
          });
      });
      return Promise.all(promises);
    });
}

function findUserAllergen(userId, userAllergenListId) {
  return db("user_allergen")
    .select("user_allergen.id AS id", "allergens.allergy", "user_allergen.*")
    .where({ user_id: userId, "user_allergen.id": userAllergenListId })
    .join("allergens", "allergen_id", "allergens.id")
    .first()
    .then(userAllergen => {
      if (!userAllergen) throw new Error("userAllergenListNotFound");
      return db("aliases")
        .where({ allergen_id: userAllergen.allergen_id })
        .then(aliases => {
          userAllergen.aliases = aliases.map(alias => {
            return alias.description;
          });
          return userAllergen;
        });
    });
}

async function createUserAllergen(userId, userAllergenId) {
  if (
    !userId ||
    typeof userId !== "number" ||
    !Number.isFinite(userId) ||
    !Number.isInteger(userId)
  )
    return Promise.reject(new Error("unauthorizedAccess"));

  if (
    !Number.isInteger(userAllergenId) ||
    userAllergenId < 0 ||
    !userAllergenId
  )
    return Promise.reject(new Error("allergenNotFound"));

  const body = {
    user_id: userId,
    allergen_id: userAllergenId
  };

  return await db("user_allergen")
    .insert(body)
    .returning(["*"]);
}

async function deleteUserAllergen(userId, userAllergenListId) {
  if (
    !userId ||
    typeof userId !== "number" ||
    !Number.isFinite(userId) ||
    !Number.isInteger(userId)
  )
    return Promise.reject(new Error("unauthorizedAccess"));
  if (
    !Number.isInteger(userAllergenListId) ||
    !Number.isFinite(userAllergenListId) ||
    typeof userAllergenListId !== "number" ||
    userAllergenListId < 0 ||
    !userAllergenListId
  )
    return Promise.reject(new Error("userAllergenListNotFound"));

  return await findUserAllergen(userId, userAllergenListId).then(response => {
    return db("user_allergen")
      .where({ id: userAllergenListId })
      .del()
      .returning(["*"]);
  });
}

module.exports = {
  getAllUserAllergens,
  findUserAllergen,
  createUserAllergen,
  deleteUserAllergen
};
