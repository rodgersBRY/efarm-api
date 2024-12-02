const logger = require("../../config/logger");

const responseLogger = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    logger.info("response-logger: %o", {
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseBody: data,
      timestamp: new Date().toISOString(),
    });

    return originalJson.call(this, data);
  };

  next();
};

module.exports = responseLogger;
