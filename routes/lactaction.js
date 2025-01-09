const app = require("express").Router();

const lactationController = require("../api/controllers/lactation");

app
  .route("/")
  .post(lactationController.newRecord)
  .get(lactationController.getRecords)
  .delete(lactationController.deleteRecord);

app.route("/:id").patch(lactationController.restoreRecord);

module.exports = app;
