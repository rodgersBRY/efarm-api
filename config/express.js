const helmet = require("helmet");
const cors = require("cors");
const { json, urlencoded } = require("express");
const { corsOptions } = require("./cors");
const morgan = require("morgan");

const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const cowRoutes = require("../routes/cow");
const herdRoutes = require("../routes/herd");
const lactationRoutes = require("../routes/lactaction");
const responseLogger = require("./response");

const expressConfig = (app) => {
  // express configs
  app
    .use(helmet())
    .use(cors(corsOptions))
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(responseLogger)
    .use(morgan("dev"));

  // app routes
  const routeResources = [
    { route: "/v1/cattle", resource: cowRoutes },
    { route: "/v1/auth", resource: authRoutes },
    { route: "/v1/herd", resource: herdRoutes },
    { route: "/v1/lactation", resource: lactationRoutes },
    { route: "/v1/user", resource: userRoutes },
  ];

  routeResources.forEach((rsc) => {
    app.use(rsc.route, rsc.resource);
  });

  // error middleware
  app.use((error, _, res, __) => {
    const status = error.status || 500;

    res.status(status).json({ error });
  });
};

module.exports = { expressConfig };
