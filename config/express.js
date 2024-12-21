const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const { urlencoded, json } = require("express");
const responseLogger = require("../utils/response");

const userRoutes = require("../routes/user");

class ExpressConfig {
  async init(app) {
    app
      .use(helmet())
      .use(logger("dev"))
      .use(cors())
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(responseLogger);

    app.get("/", (req, res, next) => {
      res.status(200).send({ message: "welcome" });
    });

    const routes = [
      // add your route resources
      { path: "/api/v1/users", handler: userRoutes },
    ];

    routes.forEach((route) => app.use(route.path, route.handler));

    // error middleware
    app.use((err, _, res, __) => {
      const message = err.message,
        status = err.statusCode || 500,
        data = err.data;

      return res.status(status).json({ error: data, message: message });
    });

    return app;
  }
}

module.exports = ExpressConfig;
