const router = require("express").Router({ mergeParams: true });
const aliasesController = require("../controllers/aliases");

router.get("/", aliasesController.findAllergenAliases);
router.post('/', aliasesController.createAllergenAlias)
router.patch('/:aliasId', aliasesController.updateAllergenAlias)

module.exports = router