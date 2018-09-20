const model = require("../models/users");
const auth = require("../lib/auth");

async function signup(req, res, next) {
  try {
    const response = await model.create(req.body);
    const token = auth.createToken(response.id);

    res.status(201).json({ token });
  } catch (e) {
    next({ status: 400, error: `User could not be registered` });
  }
}

module.exports = {
  signup
}