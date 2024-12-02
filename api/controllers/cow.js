const { CowService } = require("../../services/cow");
const MilkRecordModel = require("../../models/lactation");
const _ = require("lodash");
const { throwError } = require("../../util/error");
const logger = require("../../config/logger");

const cowService = new CowService();

// fetch all cows in the db
exports.getCows = async (req, res, next) => {
  let query = {};
  const options = {};

  if (req.query.id) {
    query = {
      _id: req.query.id,
    };
  }

  if (req.query.page) options.page = req.query.page;
  if (req.query.limit) options.limit = req.query.limit;

  try {
    const cows = await cowService.get(query, options);

    if (!cows) throwError("No records found", 404);

    return res.status(200).json(cows);
  } catch (err) {
    next(err);
  }
};

exports.getLactactingCows = async (_, res, next) => {
  try {
    const lactactingCows = await cowService.get({ lactating: true });

    if (!lactactingCows) throwError("No records found!", 404);

    return res.status(200).json(lactactingCows);
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

// delete a cow by the tag no
exports.deleteCow = async (req, res, next) => {
  const cowId = req.params.id;

  try {
    // delete the cow from the cow collection
    const cow = await cowService.delete({ _id: cowId });

    // delete all milk records for that cow

    return res
      .status(204)
      .json({ message: `${cow.name} deleted successfully` });
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