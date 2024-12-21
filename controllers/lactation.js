const LactationService = require("../services/lactaction");

const lactationService = new LactationService();

exports.newRecord = async (req, res, next) => {
  try {
    const record = await lactationService.create(req.body);

    return res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

exports.getRecords = async (req, res, next) => {
  let query = {},
    options = {};

  if (req.query.tagNo) {
    query.tagNo = req.query.tagNo;
  }

  if (req.query.page) options.page = req.query.page;
  if (req.query.limit) options.limit = req.query.limit;

  try {
    let records = await lactationService.get(query, options);

    if (!records) throwError("No records found", 404);

    return res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const record = await lactationService.update(req.query, req.body);

    return res.status(200).json(record);
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  console.log(req.query);
  
  try {
    const record = await lactationService.delete(req.query);

    return res.status(200).json({ message: "record deleted", record });
  } catch (err) {
    next(err);
  }
};

exports.restoreRecord = async (req, res, next) => {
  try {
    const record = await lactationService.restore(req.params.id);

    return res.status(200).json({ message: "record restored", record });
  } catch (err) {
    next(err);
  }
};
