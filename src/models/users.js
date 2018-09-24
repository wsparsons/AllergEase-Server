const { promisify } = require("util");
const knex = require("../db");
const bcrypt = require("bcryptjs");
const {
  isValidUserCreate,
  isValidUserLogin
} = require("../errorHandling/bodyInspect");

async function signup({ first_name, last_name, email, password }) {
  isValidUserCreate({ first_name, last_name, email, password });

  const [user] = await knex("users").where({ email });
  if (user) throw new Error("userExists");

  const hashed = await promisify(bcrypt.hash)(password, 8);

  return await knex("users")
    .insert({ first_name, last_name, email, password: hashed })
    .returning("*")
    .then(([response]) => response);
}

async function login({ email, password }) {
  isValidUserLogin({ email, password });

  const [user] = await knex("users").where({ email });
  if (!user) throw new Error("userInfoInvalid");

  const isValid = await promisify(bcrypt.compare)(password, user.password);

  if (!isValid) throw new Error("userInfoInvalid");

  return user;
}

module.exports = {
  signup,
  login
};
