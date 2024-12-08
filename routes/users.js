const app = require("express").Router();
const controller = require("../controllers/auth");
const upload = require("../config/multer");
const isAuthenticated = require("../middleware/authguard");

app.route("/").get(controller.getUsers).patch(controller.updateUser);
app.route("/register").post(controller.register);
app.route("/login").post(controller.login);

app
  .route("/upload")
  .post(isAuthenticated, upload.single("cv"), controller.updateCV);

module.exports = app;