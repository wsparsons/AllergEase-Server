function processErrorMessage(err) {
  if (err.message) {
    switch (err.message) {
      case "userFirstNameRequired":
        return {
          status: 400,
          message: "User 'first_name' is required"
        };
      case "userLastNameRequired":
        return {
          status: 400,
          message: "User 'last_name' is required"
        };
      case "userEmailRequired":
        return {
          status: 400,
          message: "User 'email' is required"
        };
      case "userPasswordRequired":
        return {
          status: 400,
          message: "User 'password' is required"
        };
      case "userExists":
        return {
          status: 400,
          message: "User could not be registered"
        };
      case "userInfoInvalid":
        return {
          status: 404,
          message: "User email or password is invalid"
        };
      case "allergenNotFound":
        return {
          status: 404,
          message: "Allergen with provided ID is not found"
        };
      case "allergenFieldRequired":
        return {
          status: 400,
          message:
            "At least one(1) of the following fields is required: 'allergy' "
        };
      case "productNotFound":
        return {
          status: 404,
          message: "Product with provided ID is not found"
        };
      case "productFieldRequired":
        return {
          status: 400,
          message:
            "At least one(1) of the following fields is required: 'name', 'ndbno', 'barcode', 'ingredients', 'manufacturer', 'image' "
        };
      case "productNameRequired":
        return {
          status: 400,
          message: "Product 'name' is required"
        };
      case "productNdbnoRequired":
        return {
          status: 400,
          message: "Product 'ndbno' is required"
        };
      case "productBarcodeRequired":
        return {
          status: 400,
          message: "Product 'barcode' is required"
        };
      case "productIngredientsRequired":
        return {
          status: 400,
          message: "Product 'ingredients' is required"
        };
      case "productManufacturerRequired":
        return {
          status: 400,
          message: "Product 'manufacturer' is required"
        };
      case "productImageRequired":
        return {
          status: 400,
          message: "Product 'image' is required"
        };

      default:
        return {
          status: 500,
          message: "An internal server error has occurred."
        };
    }
  }
}

module.exports = processErrorMessage;
