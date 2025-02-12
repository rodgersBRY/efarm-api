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

    if (data.error) {
      logger.error("Error: %o", data.error);
    }

    logger.debug("request-body %o", req.body);

    logger.debug("response-body %o", data);

    return originalJson.call(this, data);
  };

  next();
};

module.exports = responseLogger;
