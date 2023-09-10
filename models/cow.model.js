const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cowSchema = new Schema({
  breed: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  tagNo: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  modeOfAcquiring: {
    type: String,
    required: true,
  },
  offspring: [
    //children
    {
      tagNo: Number,
      name: String,
    },
  ],
  motherTag: Number,
  fatherTag: Number,
  notes: String,
});

module.exports = mongoose.model("Cow", cowSchema);
