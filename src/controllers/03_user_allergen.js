const userAllergenModel = require("../models/03_user_allergen");
const { parseToken } = require("../lib/auth");

async function getAllUserAllergens(req, res, next) {
  const token = parseToken(req.headers.authorization);
  const userId = token.sub.id;

  const response = await userAllergenModel.getAllUserAllergens(userId);

  res.status(201).json({ response });
}

async function createUserAllergen(req, res, next) {
  try {
    const token = parseToken(req.headers.authorization);
    const userId = token.sub.id;

    const userAllergenId = parseInt(req.params.userAllergenId);

    const response = await userAllergenModel.createUserAllergen(
      userId,
      userAllergenId
    );

    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function deleteUserAllergen(req, res, next) {
  try {
    const token = parseToken(req.headers.authorization);
    const userId = token.sub.id;

    const userAllergenListId = parseInt(req.params.userAllergenListId);
    const response = await userAllergenModel.deleteUserAllergen(
      userId,
      userAllergenListId
    );

    res.status(202).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUserAllergens,
  createUserAllergen,
  deleteUserAllergen
};
