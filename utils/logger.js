const winston = require("winston");
const { LOG_MODE } = require("../config/env");
const { combine, colorize, timestamp, printf, align, errors, splat, json } =
  winston.format;

const logger = winston.createLogger({
  level: LOG_MODE || "info",
  levels: winston.config.npm.levels,
  format: combine(
    colorize({ all: false }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    errors({ stack: true }),
    splat(),
    json(),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
