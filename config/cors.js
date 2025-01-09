const allowedOrigins = ["http://localhost:8080"];

const corsOptions = {
  origin: (origin, callback) => {
    // !origin - non-browser client
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false,
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions };
