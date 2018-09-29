const router = require("express").Router({ mergeParams: true });
const listsController = require("../controllers/lists");

router.post("/", listsController.findProductValence);
router.post('/product', listsController.findUSDABarcode)

module.exports = router