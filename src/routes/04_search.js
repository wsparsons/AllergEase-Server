const router = require("express").Router({ mergeParams: true });
const searchController = require("../controllers/04_search");
const auth = require('../lib/auth')

router.post("/", auth.isLoggedIn, searchController.findProductValence);

module.exports = router