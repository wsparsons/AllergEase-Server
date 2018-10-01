const axios = require("axios");
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

async function findUSDAProduct({ barcode }) {
  if (!Number.isInteger(barcode) || !barcode)
    return Promise.reject(new Error("barcodeRequired"));

  let usdaBarcodeRequest = await axios.get(
    `${process.env.USDA_URL_SEARCH}${barcode}`
  );

  if (!usdaBarcodeRequest.data.list) {
    return Promise.reject(new Error("usdaProductNotFound"));
  }

  let bingProductName = usdaBarcodeRequest.data.list.item[0].name;
  let bingProductManu = usdaBarcodeRequest.data.list.item[0].manu;
  let bingSearchName = `${bingProductName} ${bingProductManu}`

  // console.log(true, usdaBarcodeRequest.data.list.item[0])

  let usdaNdbno = usdaBarcodeRequest.data.list.item[0].ndbno;

  let usdaNdbnoRequest = await axios.get(
    `${process.env.USDA_URL_NDBNO}${usdaNdbno}`
  );

  // console.log(usdaNdbnoRequest.data.foods[0].food.ing.desc)

  let foodObject = usdaNdbnoRequest.data.foods[0].food;
  let foodDesc = foodObject.desc;
  let foodNdbno = foodDesc.ndbno;
  let foodName = foodDesc.name;
  let foodManu = foodDesc.manu;
  let foodIng = foodObject.ing.desc;

  console.log({
    name: foodName,
    ndbno: foodNdbno,
    barcode: barcode,
    ingredients: foodIng,
    manufacturer: foodManu
  });

  // return usdaRequest
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
  // findUSDAProduct,
  updateProduct,
  deleteProduct
};
