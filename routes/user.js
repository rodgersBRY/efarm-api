<<<<<<< HEAD
const router = require("express").Router();

const { updateUser, user } = require("../api/controllers/user");

router.get("/", user);
router.patch("/:id", updateUser);

module.exports = router;
=======
const app = require("express").Router();

const controller = require("../controllers/user");

/*
remove comments if you require multer for file upload 
*/

// const upload = require("../config/multer");

const isAuthenticated = require("../middleware/authguard");

app
  .route("/")
  .get(isAuthenticated, controller.getUsers)
  .patch(controller.updateUser);
app.route("/register").post(controller.register);
app.route("/login").post(controller.login);

module.exports = app;
>>>>>>> ad600514773473692c70ef51f67d221f7a567b61
