const _ = require("lodash");
const { throwError } = require("../../util/error");
const { HerdService } = require("../../services/herd");

const herdService = new HerdService();

// fetch all cows in the db
exports.getHerds = async (req, res, next) => {
  let query = {};

  const options = {};

  if (req.params.id) {
    const herd = await herdService.findById(req.params.id);
    return res.status(200).json(herd);
  }

  if (req.query.page) options.page = req.query.page;

  try {
    const herds = await herdService.get(query, options);

    if (!herds) throwError("No records found", 404);

    return res.status(200).json(herds);
  } catch (err) {
    next(err);
  }
};

// create a new herd in the db
exports.addHerd = async (req, res, next) => {
  try {
    const data = _.pick(req.body, ["name"]);

    const herdData = {
      ...data,
    };

    if (_.isEmpty(herdData.name))
      throwError("Fill in the required fields", 401);

    const herd = await herdService.create(herdData);

    res.status(200).json(herd);
  } catch (err) {
    next(err);
  }
};

// delete a herd by the herd id
exports.deleteHerd = async (req, res, next) => {
  const herdId = req.params.id;

  try {
    // delete the herd from the herd collection
    const herd = await herdService.delete({ _id: herdId });

    return res
      .status(204)
      .json({ message: `${herd.name} deleted successfully` });
  } catch (err) {
    next(err);
  }
};

// edit cow details
exports.editHerd = async (req, res, next) => {
  const herdId = req.params.id;

  try {
    const herd = await herdService.update(herdId, { ...req.body });

    return res.status(200).json(herd);
  } catch (err) {
    next(err);
  }
};
