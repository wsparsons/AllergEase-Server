const router = require("express").Router({ mergeParams: true });
const userAllergenController = require("../controllers/user_allergen");

router.get("/:userId", userAllergenController.getAllUserAllergen);

module.exports = router;
