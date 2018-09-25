const allergensModel = require("../models/allergens");

async function getAllAllergens(req, res, next) {
  try {
    const response = await allergensModel.getAllAllergens();
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function getOneAllergen(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId)
    const response = await allergensModel.getOneAllergen(allergenId);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAllergens,
  getOneAllergen
};
