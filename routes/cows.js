const app = require("express").Router();
const cowsController = require("../controllers/cow");

app.route("/").get(cowsController.getCows).post(cowsController.addCow);

app
  .route("/:id")
  .get(cowsController.getCowById)
  .patch(cowsController.editCowDetails)
  .delete(cowsController.deleteCow);

module.exports = app;
