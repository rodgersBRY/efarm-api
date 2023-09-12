const MilkRecord = require("../models/milking.model");
const Cow = require("../models/cow.model");

exports.newRecord = async (req, res, next) => {
  const { tagNo, yield, yieldOnCalf, observations } = req.body;

  try {
    const cow = await Cow.findOne({ tagNo: tagNo });

    if (!cow) throwError("cow does not exist!", 404);

    const cowInfo = {
      name: cow.name,
      tagNo: cow.tagNo,
    };

    const milkRecord = new MilkRecord({
      dateTime: formatDate(),
      cowInfo: cowInfo,
      yield: yield,
      yieldOnCalf: yieldOnCalf,
      observations: observations,
    });

    const result = await milkRecord.save();

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCowRecords = async (req, res, next) => {
  const cowTag = req.params.cowTag;

  try {
    let records = await MilkRecord.find();

    if (!records) throwError("No records found", 404);

    records = records.filter((record) => record.cowInfo.tagNo == cowTag);

    return res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};

// format date to readable string
function formatDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1 and pad with 0 if necessary.
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with 0 if necessary.
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDateTime;
}

const throwError = function (errorText, errorCode) {
  const error = new Error(errorText);
  error.status = errorCode;
  throw error;
};
