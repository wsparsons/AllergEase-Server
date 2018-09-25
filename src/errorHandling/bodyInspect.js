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
  if (!allergy) throw new Error("allergenFieldRequired");
}

function isValidAllergenUpdate({ allergy }) {
  if (!allergy) throw new Error("allergenFieldRequired");
}

function isValidProductCreate({ name, ndbno, barcode, ingredients, manufacturer, image }) {
  if (!name) throw new Error("productNameRequired");
  if (!ndbno) throw new Error("productNdbnoRequired");
  if (!barcode) throw new Error("productBarcodeRequired");
  if (!ingredients) throw new Error("productIngredientsRequired");
  if (!manufacturer) throw new Error("productManufacturerRequired");
  if (!image) throw new Error("productImageRequired");
}

function isValidProductUpdate({ name, ndbno, barcode, ingredients, manufacturer, image }) {
  if (!name && !ndbno && !barcode && !ingredients && !manufacturer && !image) throw new Error("productFieldRequired");
}

module.exports = {
  isValidUserCreate,
  isValidUserLogin,
  isValidAllergenCreate,
  isValidAllergenUpdate,
  isValidProductCreate,
  isValidProductUpdate
};
