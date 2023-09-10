const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cowInfo = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tagNo: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const milkingSchema = new Schema({
  dateTime: {
    type: String,
    required: true,
  },
  cowInfo: cowInfo,
  yield: {
    type: Number,
    required: true,
  },
  yieldOnCalf: Number,
  observations: String,
});

module.exports = mongoose.model("MilkRecord", milkingSchema);
