const winston = require("winston");
const { LOG_LEVEL } = require("../loader/env");
const { combine, colorize, timestamp, printf, align, errors, splat, json } =
  winston.format;

const loggerFormats = combine(
  colorize({ all: false }),
  timestamp({
    format: "YYYY-MM-DD hh:mm:ss",
  }),
  errors({ stack: true }),
  splat(),
  json(),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  level: LOG_LEVEL || "debug",
  levels: winston.config.npm.levels,
  format: loggerFormats,
  transports: [new winston.transports.Console()],
});

module.exports = logger;
