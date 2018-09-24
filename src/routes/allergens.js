const router = require("express").Router();
const allergensController = require('../controllers/allergens')

router.get('/', allergensController.getAllAllergens)

module.exports = router