const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cowSchema = new Schema(
  {
    breed: {
      type: String,
      required: true,
      index: true,
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
      index: true,
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
      index: true,
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
      index: true,
      default: "active",
      lowercase: true,
    },
    lactating: {
      type: Boolean,
      default: false,
      index: true,
    },
    motherTag: {
      type: Number,
      index: true,
    },
    fatherTag: {
      type: Number,
      index: true,
    },
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
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

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
    gender: "female",
    status: "active",
    lactating: true,
  });
};

cowSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

cowSchema.methods.restore = function () {
  this.deleted = false;
  this.deletedAt = null;
  return this.save();
};

module.exports = mongoose.model("Cow", cowSchema);
