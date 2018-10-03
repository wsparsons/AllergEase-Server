const router = require("express").Router();
const usersController = require("../controllers/users");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get('/verify', usersController.verify)

module.exports = router;
