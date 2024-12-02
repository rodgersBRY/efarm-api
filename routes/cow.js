const app = require("express").Router();
const cowsController = require("../api/controllers/cow");

app.route("/").get(cowsController.getCows).post(cowsController.addCow);

app.get("/lactating", cowsController.getLactactingCows);

app
  .route("/:id")
  .patch(cowsController.editCowDetails)
  .delete(cowsController.deleteCow);

module.exports = app;
