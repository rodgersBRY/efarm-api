const app = require("express").Router();
const controller = require("../api/controllers/herd");

app.route("/").get(controller.getHerds).post(controller.addHerd);

module.exports = app;
