const productsModel = require("../models/products");

async function getAllProducts(req, res, next) {
  try {
    const response = await productsModel.getAllProducts();
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function findProduct(req, res, next) {
  try {
    const id = parseInt(req.params.productId);
    const response = await productsModel.findProduct(id);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const response = await productsModel.createProduct(req.body);
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = parseInt(req.params.productId);
    const response = await productsModel.updateProduct(id, req.body);
    res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = parseInt(req.params.productId);
    const response = await productsModel.deleteProduct(id);
    res.status(202).json({ response });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
