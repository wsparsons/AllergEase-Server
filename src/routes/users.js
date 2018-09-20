const router = require("express").Router();
const usersController = require("../controllers/users");

router.post("/signup", usersController.signup);

module.exports = router;
