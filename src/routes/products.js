const router = require('express').Router()
const productsController = require('../controllers/products')

router.get("/", productsController.getAllProducts);

router.get("/:productId", productsController.findProduct);

router.post("/", productsController.createProduct);

router.patch("/:productId", productsController.updateProduct);

router.delete("/:productId", productsController.deleteProduct);

module.exports = router;