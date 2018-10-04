const router = require("express").Router({ mergeParams: true });
const userAllergenController = require("../controllers/user_allergen");

router.get("/", userAllergenController.getAllUserAllergens);

router.get("/:userAllergenListId", userAllergenController.findUserAllergen);

router.post("/:userAllergenId", userAllergenController.createUserAllergen);

router.delete("/:userAllergenListId", userAllergenController.deleteUserAllergen);

module.exports = router;
