const { promisify } = require("util");
const db = require("../db");
const bcrypt = require("bcryptjs");

async function create({ password, ...body }) {
  const hashed = await promisify(bcrypt.hash)(password, 8);
  return db("users")
    .insert({ ...body, password: hashed })
    .returning("*")
    .then(([response]) => response);
}

module.exports = {
  create
};
