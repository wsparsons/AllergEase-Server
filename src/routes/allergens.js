const router = require("express").Router();
const allergensController = require('../controllers/allergens')

router.get('/', allergensController.getAllAllergens)
router.get('/:allergenId', allergensController.getOneAllergen)

module.exports = router