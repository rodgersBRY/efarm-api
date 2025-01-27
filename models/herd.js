const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const herdSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Herd", herdSchema);
