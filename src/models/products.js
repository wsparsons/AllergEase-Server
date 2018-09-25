const db = require("../db");
const {
  isValidProductCreate,
  isValidProductUpdate
} = require("../errorHandling/bodyInspect");

function getAllProducts() {
  return db("products");
}

function findProduct(id) {
  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("productNotFound"));

  return db("products")
    .where({ id })
    .select("*")
    .first()
    .then(foundProduct => {
      if (!foundProduct) throw new Error("productNotFound");
      return foundProduct;
    });
}

async function createProduct(body) {
  isValidProductCreate(body);

  const fields = [
    "name",
    "ndbno",
    "barcode",
    "ingredients",
    "manufacturer",
    "image"
  ];

  if (!fields.every(field => body[field]))
    return Promise.reject(new Error("productFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("productFieldRequired"));

  return await db("products")
    .insert(body)
    .returning(["*"]);
}

async function updateProduct(id, body) {
  isValidProductUpdate(body);

  const fields = [
    "name",
    "ndbno",
    "barcode",
    "ingredients",
    "manufacturer",
    "image"
  ];

  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("productNotFound"));
  if (!Object.keys(body).length === 0)
    return Promise.reject(new Error("productFieldRequired"));
  if (!Object.keys(body).every(field => fields.includes(field)))
    return Promise.reject(new Error("productFieldRequired"));

  return await findProduct(id).then(response => {
    return db("products")
      .where({ id })
      .update({ ...response, ...body, updated_at: new Date() })
      .returning(["*"]);
  });
}

function deleteProduct(id) {
  if (!Number.isInteger(id) || id < 0 || !id)
    return Promise.reject(new Error("productNotFound"));

  return findProduct(id).then(response => {
    return db("products")
      .where({ id })
      .del()
      .returning(["*"]);
  });
}

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
