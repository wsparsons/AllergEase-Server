const router = require("express").Router({ mergeParams: true });
const userAllergenController = require("../controllers/user_allergen");

router.get("/", userAllergenController.getAllUserAllergens);

router.get("/:userAllergenId", userAllergenController.findUserAllergen);

router.post("/:userAllergenId", userAllergenController.createUserAllergen);

router.delete("/:userAllergenId", userAllergenController.deleteUserAllergen);

module.exports = router;
