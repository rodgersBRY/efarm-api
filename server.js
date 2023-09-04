const bodyParser = require("body-parser"),
  express = require("express"),
  cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import the routes

// error middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const status = err.status;
  const data = err.data;

  return res.status(status).json(message);
});

// start the express server
app.listen(port, () => {
  console.log(`May the ${port} be with you`);
});
