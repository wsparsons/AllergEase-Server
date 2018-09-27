const userAllergenModel = require("../models/user_allergen")
const { parseToken } = require('../lib/auth')

async function getAllUserAllergen(req, res, next) {
  // const token = parseToken(req.headers.authorization)
  // const userId = token.sub.id 
  const userId = req.params.userId 

  const response = await userAllergenModel.getAllUserAllergen(userId)

  res.status(201).json({ response })
}

module.exports = {
  getAllUserAllergen
}