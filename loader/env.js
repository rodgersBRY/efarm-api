const MONGO_URI = process.env["MONGO_URI"];
const PORT = process.env["PORT"];

const JWT_SECRET_TOKEN = process.env["JWT_SECRET_TOKEN"];

const NODE_ENV = process.env["NODE_ENV"];

const ADMIN_EMAIL = process.env["ADMIN_EMAIL"];
const ADMIN_PASS = process.env["ADMIN_PASS"];
const INIT_ADMIN = process.env["INIT_ADMIN"];

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET_TOKEN,
  NODE_ENV,
  ADMIN_EMAIL,
  ADMIN_PASS,
  INIT_ADMIN
};
