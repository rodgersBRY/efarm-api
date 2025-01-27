const app = require("express").Router();

const controller = require("../controllers/lactation");

app
  .route("/")
  .post(controller.newRecord)
  .get(controller.getRecords)
  .delete(controller.deleteRecord);

app.route("/:id").patch(controller.restoreRecord);

module.exports = app;
