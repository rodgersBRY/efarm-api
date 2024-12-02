require("dotenv").config();
require("reflect-metadata");

const express = require("express");
const logger = require("./config/logger");
const { PORT } = require("./loader/env");
const { expressConfig } = require("./config/express");
const { dbInit } = require("./config/db");
const SystemService = require("./services/system");
const { CowService } = require("./services/cow");
const CowEventsHandler = require("./events/cow");
const ErrorEventsHandler = require("./events/error");

const app = express();
const systemService = new SystemService();

const cowService = new CowService();

new CowEventsHandler(cowService);

app.get("/", (req, res, next) => {
  res.send({ message: "This is only the beginning chap!" });
});

function serve() {
  dbInit();

  expressConfig(app);

  systemService.init();

  app.listen(PORT, () => {
    logger.info(`app-init: http://localhost:${PORT}`);
  });
}

serve();
