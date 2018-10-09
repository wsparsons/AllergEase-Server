const router = require("express").Router({ mergeParams: true });
const listsController = require("../controllers/04_search");

router.post("/", listsController.findProductValence);

module.exports = router