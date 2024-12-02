const router = require("express").Router();

const milkingController = require("../api/controllers/milking.controller");

router.get("/:cowTag", milkingController.getCowRecords);

router.post("/new", milkingController.newRecord);

module.exports = router;
