const allergensModel = require("../models/02_allergens");

async function getAllAllergensAliases(req, res, next) {
  try {
    const response = await allergensModel.getAllAllergensAliases();
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAllergensAliases
};
