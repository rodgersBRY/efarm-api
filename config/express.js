const helmet = require("helmet");
const cors = require("cors");
const { json, urlencoded } = require("express");
const { corsOptions } = require("./cors");
const userRoutes = require("../routes/user");
const cowRoutes = require("../routes/cow");
const milkingRoutes = require("../routes/milking.routes");
const responseLogger = require("../api/middlewares/responseLogger");

const expressConfig = (app) => {
  // express configs
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(responseLogger);

  // app routes
  const routeResources = [
    { route: "/v1/cows", resource: cowRoutes },
    { route: "/v1/user", resource: userRoutes },
    { route: "/v1/milk", resource: milkingRoutes },
  ];

  routeResources.forEach((rsc) => {
    app.use(rsc.route, rsc.resource);
  });

  // error middleware
  app.use((err, _, res, __) => {
    const message = err.message;
    const status = err.status || 500;
    const data = err.data;

    return res.status(status).json({ message, data });
  });
};

module.exports = { expressConfig };
