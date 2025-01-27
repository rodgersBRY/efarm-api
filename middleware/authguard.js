const jwt = require("jsonwebtoken");

module.exports = async (req, _, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    const error = new Error("NO AUTH HEADERS!");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  } catch (err) {
    next(err);
  }

  if (!decodedToken) {
    const error = new Error("UNVERIFIABLE TOKEN!");
    error.statusCode = 401;
    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};
