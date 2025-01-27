
require("dotenv").config();

const express = require("express");
const MongoDB = require("./config/db");
const { PORT } = require("./config/env");
const { createServer } = require("http");
const {expressConfig} = require("./config/express");
const SystemService = require("./services/system");
const logger = require("./utils/logger");

const app = express();

const mongoDB = new MongoDB();

const systemService = new SystemService();

const server = createServer(app);

async function serve() {
  await mongoDB.init();

  expressConfig(app);

  systemService.init();

  server.listen(PORT, () => {
    logger.info("server-init port: %o", parseInt(PORT));
  });
}

serve();
