const { CowService } = require("../../services/cow");
// const MilkRecordModel = require("../../models/lactation");
const _ = require("lodash");
const { throwError } = require("../../util/error");

const cowService = new CowService();

// fetch all cows in the db
exports.getCows = async (req, res, next) => {
  let query = {};

  const options = {};

  if (req.query.id) {
    const cow = await cowService.findById(req.query.id);
    return res.status(200).json({ cow });
  }

  if (req.query.page) options.page = req.query.page;

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
    if (!req.body.tag) {
      throwError("Cow's tag is required", 401);
    }

    const data = _.pick(req.body, [
      "breed",
      "tag",
      "gender",
      "herd",
      "weight",
      "dam",
      "sire",
      "modeOfAcquiring",
      "lactating",
      "healthStatus",
      "dob",
      "notes",
    ]);

    const cowData = {
      ...data,
      dob: new Date(data.dob).toISOString(),
    };

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
    const cow = await cowService.delete({ _id: cowId });

    if (!cow) throwError("Cow not found", 404);

    return res.status(200);
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
