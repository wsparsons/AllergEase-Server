const router = require("express").Router({ mergeParams: true });
const userAllergenController = require("../controllers/user_allergen");
const auth = require('../lib/auth')


router.get("/", auth.isLoggedIn, userAllergenController.getAllUserAllergens);

router.get("/:userAllergenListId", auth.isLoggedIn, userAllergenController.findUserAllergen);

router.post("/:userAllergenId", auth.isLoggedIn, userAllergenController.createUserAllergen);

router.delete("/:userAllergenListId", auth.isAuthorized, userAllergenController.deleteUserAllergen);

module.exports = router;
