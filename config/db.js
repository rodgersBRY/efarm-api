const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");
const logger = require("../utils/logger");

class MongoDB {
  async init() {
    try {
      const { connection } = await mongoose.connect(MONGO_URI);
      
      const { host, port, name } = connection;

      logger.info(`db-init url: mongodb://${host}:${port}/${name}`);
    } catch (err) {
      logger.error("db-init error: %o", err);
      process.exit(1);
    }
  }
}

module.exports = MongoDB;
