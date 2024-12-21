const router = require("express").Router();

const milkingController = require("../controllers/milking.controller");

router.get("/:cowTag", milkingController.getCowRecords);

router.post("/new", milkingController.newRecord);

module.exports = router;
