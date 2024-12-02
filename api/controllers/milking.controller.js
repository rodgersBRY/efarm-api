const MilkRecord = require("../../models/lactation");
const Cow = require("../../models/cow");

exports.newRecord = async (req, res, next) => {
  const { tagNo, yield, yieldOnCalf, observations } = req.body;

  try {
    const cow = await Cow.findOne({ tagNo: tagNo });

    if (!cow) throwError("cow does not exist!", 404);

    const milkRecord = new MilkRecord({
      dateTime: formatDate(),
      cowName: cow.name,
      tagNo: cow.tagNo,
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

  console.log(cowTag);

  try {
    let records = await MilkRecord.find({ tagNo: cowTag });

    if (!records) throwError("No records found", 404);

    return res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};
