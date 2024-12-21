<<<<<<< HEAD
require("dotenv").config();

const express = require("express");
const MongoDB = require("./config/db");
const { PORT } = require("./config/env");
const { createServer } = require("http");
const ExpressConfig = require("./config/express");
const SystemService = require("./services/system");
const logger = require("./utils/logger");

const app = express();

const mongoDB = new MongoDB();

const expressConfig = new ExpressConfig();
const systemService = new SystemService();

const server = createServer(app);

async function serve() {
  await mongoDB.init();

  expressConfig.init(app);

  systemService.init();

  server.listen(PORT, () => {
    logger.info("server-init port: %o", parseInt(PORT));
  });
}

serve();
=======
const bodyParser = require("body-parser"),
  express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  logger = require("morgan"),
  userRoutes = require("./routes/user.routes"),
  cowRoutes = require("./routes/cow.routes"),
  milkingRoutes = require("./routes/milking.routes"),
  employeeRoutes = require("./routes/employee.routes");

require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

// connect to mongo db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo docked and ready for boarding");
  })
  .catch((err) => {
    console.error("Error connecting to the database\n", err);
  });

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send({ message: "This is only the beginning chap!" });
});

// import the routes
app.use("/api/v1/cows", cowRoutes);
app.use("/api/v1/milking", milkingRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/employees", employeeRoutes);

// error middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const status = err.status || 500;
  const data = err.data;

  return res.status(status).json({ message, data });
});

// start the express server
app.listen(port, () => {
  console.log(`May the ${port} be with you`);
});

module.exports = app;
>>>>>>> origin/main
