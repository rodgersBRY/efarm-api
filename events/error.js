const logger = require("../config/logger");

class ErrorEvents {
  constructor(service) {
    this.service = service;

    service.on("error", this.handleError);
  }

  handleError(err) {
    logger.error("error: %o", {
      message: err.message,
      stack: err.stack,
      timestamp: new Date(),
    });
  }

}

module.exports = ErrorEvents;
