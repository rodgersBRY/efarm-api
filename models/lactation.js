const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const lactationSchema = new Schema(
  {
    milkingSession: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    dateTime: {
      type: String,
      required: true,
    },
    tagNo: {
      type: String,
      ref: "Cow",
      required: true,
    },
    yield: {
      type: Number,
      required: true,
    },
    yieldOnCalf: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    remainingMilk: {
      type: Number,
    },
    observations: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

lactationSchema.index({ tagNo: 1 });
lactationSchema.index({ createdBy: 1 });

lactationSchema.pre("find", function () {
  this.where({ deleted: false });
});

lactationSchema.pre("findOne", function () {
  this.where({ deleted: false });
});

lactationSchema.pre("save", function () {
  this.remainingMilk = this.yield - this.yieldOnCalf;
});

lactationSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  indexFields: ["deleted", "deletedAt"],
});

module.exports = mongoose.model("LactationRecord", lactationSchema);
