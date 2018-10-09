const searchModel = require("../models/04_search");

async function findProductValence(req, res, next) {
  try {
    const userId = parseInt(req.params.userId);

    const response = await searchModel.findProductValence(userId, req.body);

    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findProductValence
};
