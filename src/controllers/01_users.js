const usersModel = require("../models/01_users");
const auth = require("../lib/auth");

async function signup(req, res, next) {
  try {
    const response = await usersModel.signup(req.body);
    const token = auth.createToken(response.id);
    const user = { userId: response.id, first_name: response.first_name }
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const response = await usersModel.login(req.body);
    const token = auth.createToken(response.id);
    const user = { userId: response.id, first_name: response.first_name };

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
}

async function verify(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next({ message: "unauthorizedAccess" });
    }
    const token = auth.parseToken(authorization);
    const userId = token.sub.id;
    const response = await usersModel.verify(userId)
    const user = { userId: userId, first_name: response.first_name };
    
    res.status(200).json({ user });
  } catch (err) {
    next({ message: "sessionExpired" });
  }
}

module.exports = {
  signup,
  login,
  verify
};
