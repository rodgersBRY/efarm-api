const MONGO_URI = process.env["MONGO_URI"];
const PORT = process.env["PORT"];
const JWT_SECRET_TOKEN = process.env["JWT_SECRET_TOKEN"];

const LOG_MODE = process.env["LOG_MODE"];
const CREATE_ADMIN = process.env["CREATE_ADMIN"];
const ADMIN_EMAIL = process.env["ADMIN_EMAIL"];
const ADMIN_PASS = process.env["ADMIN_PASS"];

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET_TOKEN,
  CREATE_ADMIN,
  ADMIN_EMAIL,
  ADMIN_PASS,
  LOG_MODE,
};
