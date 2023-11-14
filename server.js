const bodyParser = require("body-parser"),
  express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  logger = require("morgan"),
  userRoutes = require("./routes/user.routes"),
  cowRoutes = require("./routes/cow.routes"),
  milkingRoutes = require("./routes/milking.routes");

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
    console.error("Error connecting to the database.");
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
