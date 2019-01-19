const allergensModel = require("./src/models/02_allergens");

function getAllergens() {
  return allergensModel.getAllAllergensAliases();
}


getAllergens()
