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

function isLoggedIn(req, res, next) {
  try {
    parseToken(req.headers.authorization);
    next();
  } catch (err) {
    next("sessionExpired");
  }
}

async function isAuthorized(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next("unauthorizedAccess");
    }
    const token = parseToken(authorization);
    const userId = token.sub.id;
    
    const userAllergenId = req.params.userAllergenId;
    const userAllergen = await db("user_allergen").where({
      id: userAllergenId
    });

    if (userAllergen.user_id !== userId) {
      return next("unauthorizedAccess");
    }

    const listId = req.params.listId;
    const list = await db("lists").where({ id: listId });

    if (list.user_id !== userId) {
      return next("unauthorizedAccess");
    }

    next();
  } catch (err) {
    next("sessionExpired");
  }
}

module.exports = {
  createToken,
  parseToken,
  isLoggedIn,
  isAuthorized
};
