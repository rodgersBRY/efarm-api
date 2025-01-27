require("dotenv").config();

const express = require("express");
const logger = require("./config/logger");
const { PORT } = require("./loader/env");
const { expressConfig } = require("./config/express");
const MongoDB = require("./config/db");
const SystemService = require("./services/system");
const { createServer } = require("http");

const app = express();
const systemService = new SystemService();
const mongoDB = new MongoDB();

const server = createServer(app);

async function serve() {
  try {
    await mongoDB.init();
  } catch (err) {
    logger.error("mongoose-init-error", err);
  }

  expressConfig(app);

  systemService.init();

  server.listen(PORT, () => {
    logger.info(`app-init: http://localhost:${PORT}`);
  });
}

serve();
