function isValidUserCreate({ first_name, last_name, email, password }) {
  if (!first_name) throw new Error("userFirstNameRequired");
  if (!last_name) throw new Error("userLastNameRequired");
  if (!email) throw new Error("userEmailRequired");
  if (!password) throw new Error("userPasswordRequired");
}

function isValidUserLogin({ email, password }) {
  if (!email) throw new Error("userEmailRequired");
  if (!password) throw new Error("userPasswordRequired");
}

function isValidAllergenCreate({ allergy }) {
  if (!allergy) throw new Error("allergenAllergyRequired");
}

function isValidAllergenUpdate({ allergy }) {
  if (!allergy) throw new Error("allergenAllergyRequired");
}

function isValidProductCreate({
  name,
  ndbno,
  barcode,
  ingredients,
  manufacturer,
  image
}) {
  if (!name) throw new Error("productNameRequired");
  if (!ndbno) throw new Error("productNdbnoRequired");
  if (!barcode) throw new Error("productBarcodeRequired");
  if (!ingredients) throw new Error("productIngredientsRequired");
  if (!manufacturer) throw new Error("productManufacturerRequired");
  if (!image) throw new Error("productImageRequired");
}

function isValidProductUpdate({
  name,
  ndbno,
  barcode,
  ingredients,
  manufacturer,
  image
}) {
  if (!name && !ndbno && !barcode && !ingredients && !manufacturer && !image)
    throw new Error("productFieldRequired");
}

function isValidAliasCreate({ description }) {
  if (!description) throw new Error("aliasDescriptionRequired");
}

function isValidAliasUpdate({ description }) {
  if (!description) throw new Error("aliasDescriptionRequired");
}

function isValidUserAllergenCreate({ user_id, allergen_id }) {
  if (!user_id || typeof user_id !== "number" || !Number.isFinite(user_id) ||!Number.isInteger(user_id))
    throw new Error("unauthorizedAccess");
  if (!allergen_id || typeof allergen_id !== "number" || !Number.isFinite(allergen_id) ||!Number.isInteger(allergen_id))
    throw new Error("allergenNotFound");
}

module.exports = {
  isValidUserCreate,
  isValidUserLogin,
  isValidAllergenCreate,
  isValidAllergenUpdate,
  isValidProductCreate,
  isValidProductUpdate,
  isValidAliasCreate,
  isValidAliasUpdate,
  isValidUserAllergenCreate
};
