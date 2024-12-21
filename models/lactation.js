const { model, Schema } = require("mongoose");

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
      default: null,
    },
    remainingMilk: {
      type: Number,
      required: false,
    },
    observations: {
      type: String,
      required: false,
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

lactationSchema.pre("save", function (next) {
  this.remainingMilk = this.yield - this.yieldOnCalf;
  next();
});

lactationSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

lactationSchema.methods.restore = function () {
  this.deleted = false;
  this.deletedAt = null;
  return this.save();
};

module.exports = model("LactationRecord", lactationSchema);
