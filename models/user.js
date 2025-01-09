const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "employee",
    enum: ["other", "employee", "admin"],
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  farmName: {
    type: String,
    required: false,
    lowercase: true,
  },
  farmSize: {
    type: Number,
    required: false,
  },
  farmType: {
    type: String,
    required: false,
    lowercase: true,
  },
});

module.exports = mongoose.model("User", userSchema);
