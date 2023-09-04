const router = require("express").Router();
const cowsController = require("../controllers/cow.controller");

router.get("/", cowsController.getCows);

module.exports = router;
