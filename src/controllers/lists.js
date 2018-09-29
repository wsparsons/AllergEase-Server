const listsModel = require("../models/lists");

async function findProductValence(req, res, next) {
  try {
    const userId = parseInt(req.params.userId);
    
    const response = await listsModel.findProductValence(userId, req.body);
    
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
} 

async function findUSDABarcode(req, res, next) {
  try {
    const response = await productsModel.findUSDAProduct(req.body);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findProductValence,
  findUSDABarcode
}
