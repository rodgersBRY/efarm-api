const router = require("express").Router();

const { updateUser, user } = require("../api/controllers/user");

router.get("/", user);
router.patch("/:id", updateUser);

module.exports = router;
