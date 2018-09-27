const allergensModel = require("../models/allergens");

async function getAllAllergens(req, res, next) {
  try {
    const response = await allergensModel.getAllAllergens();
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function getAllAllergensAliases(req, res, next) {
  try {
    const response = await allergensModel.getAllAllergensAliases();
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}


async function findAllergen(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId);
    const response = await allergensModel.findAllergen(allergenId);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function findAllergenAliases(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId);
    const response = await allergensModel.findAllergenAliases(allergenId);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function createAllergen(req, res, next) {
  try {
    const response = await allergensModel.createAllergen(req.body);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function updateAllergen(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId);
    const response = await allergensModel.updateAllergen(allergenId, req.body);
    res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
}

async function deleteAllergen(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId);
    const response = await allergensModel.deleteAllergen(allergenId);
    res.status(202).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAllergens,
  getAllAllergensAliases,
  findAllergen,
  findAllergenAliases,
  createAllergen,
  updateAllergen,
  deleteAllergen
};
