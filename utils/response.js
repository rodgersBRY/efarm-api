const logger = require("./logger");

const responseLogger = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    logger.debug("%o", data);

    return originalJson.call(this, data);
  };

  next();
};

module.exports = responseLogger;
