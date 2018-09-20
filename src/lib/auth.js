const { SECRET_KEY } = process.env;
const { sign, verify } = require("jsonwebtoken");
const db = require("../db");

function createToken(id) {
  const sub = { sub: { id } };
  const options = { expiresIn: "10 days" };

  return sign(sub, SECRET_KEY, options);
}

function parseToken(header) {
  const token = header && header.split("Bearer ")[1];

  return verify(token, SECRET_KEY);
}

function isLoggedIn(req, res, next){
  try {
    parseToken(req.header.authorization)
    next()
  } catch (e){
    next({
      status: 401,
      error: `Session has expired. Please login again.`
    })
  }
}

module.exports = {
  createToken,
  parseToken,
  isLoggedIn
}