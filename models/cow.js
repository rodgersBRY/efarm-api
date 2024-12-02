const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const cowSchema = new Schema(
  {
    breed: {
      type: String,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      lowercase: true,
    },
    tagNo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
      enum: ["purchase", "born"],
      lowercase: true,
    },
    offspring: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cow",
      },
    ],
    status: {
      type: String,
      enum: ["active", "sold", "deceased"],
      default: "active",
      lowercase: true,
    },
    lactating: {
      type: Boolean,
      default: false,
    },
    motherTag: Number,
    fatherTag: Number,
    notes: String,
    pregnancyHistory: [
      {
        startDate: Date,
        dueDate: Date,
        actualBirthDate: Date,
        offspringTag: Number,
        complications: String,
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

cowSchema.index({ tagNo: 1 }, { unique: true });
cowSchema.index({ name: 1 });
cowSchema.index({ breed: 1 });
cowSchema.index({ motherTag: 1 });
cowSchema.index({ fatherTag: 1 });
cowSchema.index({ lactating: 1 });

// Calculate age
cowSchema.virtual("age").get(function () {
  return Math.floor(
    (new Date() - new Date(this.dob)) / (365.25 * 24 * 60 * 60 * 1000)
  );
});

cowSchema.pre("find", function () {
  this.where({ deleted: false });
});

cowSchema.pre("findOne", function () {
  this.where({ deleted: false });
});

// Add method to check if cow is eligible for milking
cowSchema.methods.isLactationEligible = function () {
  return this.gender === "Female" && this.age >= 2;
};

// Add static method to find all lactating cows
cowSchema.statics.findLactatingCattle = function () {
  return this.find({
    gender: "Female",
    status: "Active",
    lactating: true,
  });
};

cowSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  indexFields: ["deleted", "deletedAt"],
});

module.exports = mongoose.model("Cow", cowSchema);
