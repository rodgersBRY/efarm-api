const CowService = require("../services/cow");
const _ = require("lodash");
const { throwError } = require("../utils/error");
const logger = require("../utils/logger");

const cowService = new CowService();

// fetch all cows in the db
exports.getCows = async (req, res, next) => {
  let query = {
    ...req.query,
  };
  const options = {};

  if (req.query.page) options.page = req.query.page;
  if (req.query.limit) options.limit = req.query.limit;

  try {
    const cows = await cowService.get(query, options);

    if (!cows) throwError("no cows found", 404);

    return res.status(200).json({ cows });
  } catch (err) {
    next(err);
  }
};

exports.getCowById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const cow = await cowService.findById(id);
    if (!cow) throwError("cow not found!", 404);

    return res.status(200).json({ cow });
  } catch (err) {
    next(err);
  }
};

// create a new cow in the db
exports.addCow = async (req, res, next) => {
  try {
    const data = _.pick(req.body, [
      "breed",
      "name",
      "tagNo",
      "gender",
      "weight",
      "fatherTag",
      "motherTag",
      "modeOfAcquiring",
      "milked",
      "notes",
    ]);

    const cowData = {
      ...data,
      dob: new Date().toISOString(),
    };

    if (
      _.some(["tagNo", "name", "breed"], (field) => _.isEmpty(cowData[field]))
    )
      throwError("Fill in the required fields", 401);

    const cow = await cowService.create(cowData);

    res.status(200).json(cow);
  } catch (err) {
    next(err);
  }
};

// delete a cow
exports.deleteCow = async (req, res, next) => {
  const cowId = req.params.id;

  try {
    // delete the cow from the cow collection
    const cow = await cowService.delete({ _id: cowId });

    // delete all milk records for that cow

    return res.status(200).json({ cow });
  } catch (err) {
    next(err);
  }
};

// edit cow details
exports.editCowDetails = async (req, res, next) => {
  const cowId = req.params.id;

  try {
    const cow = await cowService.update(cowId, { ...req.body });

    return res.status(200).json(cow);
  } catch (err) {
    next(err);
  }
};
