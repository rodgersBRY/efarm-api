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
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
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
      _id: false,
    },
  ],
  milked: {
    type: Boolean,
    default: false,
  },
  motherTag: Number,
  fatherTag: Number,
  notes: String,
});

module.exports = mongoose.model("Cow", cowSchema);
