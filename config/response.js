const logger = require("./logger");

const responseLogger = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    if (req.params) {
      logger.debug("request-params %o", req.params);
    }
    if (req.query) {
      logger.debug("request-query %o", req.query);
    }

    logger.debug("request-body %o", req.body);

    if (data.errors) {
      logger.error("Error: %o", data.errors);
    }

    logger.debug("%o", data);

    return originalJson.call(this, data);
  };

  next();
};

module.exports = responseLogger;
