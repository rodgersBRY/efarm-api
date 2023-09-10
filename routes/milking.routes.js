const router = require("express").Router();

const milkingController = require("../controllers/milking.controller");

router.get("/", milkingController.getAllrecords);

router.post("/new", milkingController.newRecord);

module.exports = router;
