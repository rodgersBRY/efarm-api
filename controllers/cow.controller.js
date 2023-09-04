const Cow = require("../models/cow.model");

exports.getCows = async (_, res, next) => {
  try {
    const cows = await Cow.find();

    if (!cows) throwError("No records found", 404);

    return res.status(200).json(cows);
  } catch (err) {
    next(err);
  }
};

exports.addCow = async (req, res, next) => {
  const {} = req.body;
};

const throwError = function (errorText, errorCode) {
  const error = new Error(errorText);
  error.status = errorCode;
  throw error;
};
