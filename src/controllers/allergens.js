const allergensModel = require("../models/allergens");

async function getAllAllergens(req, res, next) {
  try {    
    const response = await allergensModel.getAllAllergens();
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAllergens
}