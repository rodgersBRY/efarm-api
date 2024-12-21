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
