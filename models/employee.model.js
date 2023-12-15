const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  idNo: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
