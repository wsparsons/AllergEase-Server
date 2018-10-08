const userAllergenModel = require("../models/user_allergen");
const { parseToken } = require("../lib/auth");

async function getAllUserAllergens(req, res, next) {
  // const token = parseToken(req.headers.authorization)
  // const userId = token.sub.id
  const userId = parseInt(req.params.userId);

  const response = await userAllergenModel.getAllUserAllergens(userId);

  res.status(201).json({ response });
}

async function findUserAllergen(req, res, next) {
  try {
    // const token = parseToken(req.headers.authorization)
    // const userId = token.sub.id

    const userId = parseInt(req.params.userId);
    const userAllergenListId = parseInt(req.params.userAllergenListId);

    const response = await userAllergenModel.findUserAllergen(
      userId,
      userAllergenListId
    );

    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function createUserAllergen(req, res, next) {
  try {
    // const token = parseToken(req.headers.authorization)
    // const userId = token.sub.id

    const userId = parseInt(req.params.userId);
    const userAllergenId = parseInt(req.params.userAllergenId);

    const response = await userAllergenModel.createUserAllergen({
      user_id: userId,
      allergen_id: userAllergenId
    });

    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function deleteUserAllergen(req, res, next) {
  try {
    // const token = parseToken(req.headers.authorization)
    // const userId = token.sub.id

    const userId = parseInt(req.params.userId);
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
  findUserAllergen,
  createUserAllergen,
  deleteUserAllergen
};
