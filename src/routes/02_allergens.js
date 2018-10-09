const router = require("express").Router();
const allergensController = require("../controllers/02_allergens");

router.get("/", allergensController.getAllAllergensAliases);


module.exports = router;
