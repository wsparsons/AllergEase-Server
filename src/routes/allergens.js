const router = require("express").Router();
const allergensController = require("../controllers/allergens");

router.get("/", allergensController.getAllAllergens);
router.get("/:allergenId", allergensController.findAllergen);
router.post("/", allergensController.createAllergen);
router.patch("/:allergenId", allergensController.updateAllergen);
router.delete("/:allergenId", allergensController.deleteAllergen);

module.exports = router;
