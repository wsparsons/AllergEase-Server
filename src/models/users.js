const { promisify } = require("util");
const db = require("../db");
const bcrypt = require("bcryptjs");
const { isValidUserCreate, isValidUserLogin } = require("../errorHandling/bodyInspect");

async function create({ password, ...body }) {
  isValidUserCreate({ password, ...body });

  const hashed = await promisify(bcrypt.hash)(password, 8);
  return await db("users")
    .insert({ ...body, password: hashed })
    .returning("*")
    .then(([response]) => response);
}

async function login({ email, password }) {
  isValidUserLogin({ email, password });

  const [user] = await db('users').where({ email })
  if (!user) throw new Error("userInfoInvalid")
  
  const isValid = await promisify(bcrypt.compare)(password, user.password)
  
  if(!isValid) throw new Error("userInfoInvalid")

  return user
}

module.exports = {
  create,
  login
};
