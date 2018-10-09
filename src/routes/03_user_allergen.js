const router = require("express").Router({ mergeParams: true });
const userAllergenController = require("../controllers/03_user_allergen");
const auth = require('../lib/auth')


router.get("/", auth.isLoggedIn, userAllergenController.getAllUserAllergens);

router.post("/:userAllergenId", auth.isLoggedIn, userAllergenController.createUserAllergen);

router.delete("/:userAllergenListId", auth.isAuthorized, userAllergenController.deleteUserAllergen);

module.exports = router;
