const mongoose = require("mongoose");

const { MONGO_URI } = require("../loader/env");
const logger = require("./logger");

const dbInit = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => logger.info("db-init: %o", "mongodb://localhost:27017"))
    .catch((err) => {
      logger.error("db-init: %o", err);
    });
};

module.exports = { dbInit };
