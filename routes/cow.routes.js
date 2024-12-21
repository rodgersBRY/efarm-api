const router = require("express").Router();
const cowsController = require("../controllers/cow.controller");

router.get("/", cowsController.getCows);
router.get("/milked", cowsController.getMilkedCows);

router.post("/new-cow", cowsController.addCow);
router.delete("/delete/:tagNo", cowsController.deleteCow);

module.exports = router;
