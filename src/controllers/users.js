const usersModel = require("../models/users");
const auth = require("../lib/auth");

async function signup(req, res, next) {
  try {
    const response = await usersModel.signup(req.body);
    const token = auth.createToken(response.id);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const response = await usersModel.login(req.body);
    const token = auth.createToken(response.id);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login
};
