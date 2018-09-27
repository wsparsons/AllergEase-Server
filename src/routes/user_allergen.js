const router = require("express").Router({ mergeParams: true });
const userAllergenController = require("../controllers/user_allergen");

router.get("/:userId/allergens", userAllergenController.getAllUserAllergens);

router.get("/:userId/allergens/:userAllergenId", userAllergenController.findUserAllergen);

router.post("/:userId/allergens", userAllergenController.createUserAllergen)

router.delete('/:userId/allergens/:userAllergenId', userAllergenController.deleteUserAllergen)


module.exports = router;
