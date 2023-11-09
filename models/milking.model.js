const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const milkingSchema = new Schema({
  dateTime: {
    type: String,
    required: true,
  },
  cowName: {
    type: String,
    required: true,
  },
  tagNo: {
    type: Number,
    required: true,
  },
  yield: {
    type: Number,
    required: true,
  },
  yieldOnCalf: Number,
  observations: String,
});

module.exports = mongoose.model("MilkRecord", milkingSchema);
