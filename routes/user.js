const router = require("express").Router();

const userController = require("../api/controllers/user");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
