const aliasesModel = require("../models/aliases");

async function findAllergenAliases(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId);
    const response = await aliasesModel.findAllergenAliases(allergenId);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function createAllergenAlias(req, res, next) {
  try {
    const allergenId = parseInt(req.params.allergenId);
    const response = await aliasesModel.createAllergenAlias(allergenId, req.body);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function updateAllergenAlias(req, res, next){
  try {
    const allergenId = parseInt(req.params.allergenId);
    const aliasId = parseInt(req.params.aliasId)
    const response = await aliasesModel.updateAllergenAlias(allergenId, aliasId, req.body);
    res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findAllergenAliases,
  createAllergenAlias,
  updateAllergenAlias
};
