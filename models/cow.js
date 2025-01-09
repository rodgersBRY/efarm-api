const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

// TODO:// ADD PADDOCK/HERD GROUP TO COW SCHEMA
const cowSchema = new Schema(
  {
    breed: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    herd: {
      type: Schema.Types.ObjectId,
      ref: "Herd",
      index: true,
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
      index: true,
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
      enum: ["active", "sold"],
      index: true,
      default: "active",
      lowercase: true,
    },
    healthStatus: {
      type: String,
      enum: ["healthy", "sick", "injured", "deceased"],
      index: true,
      default: "healthy",
      lowercase: true,
    },

    lactating: {
      type: Boolean,
      default: false,
      index: true,
    },
    damEarTag: {
      type: Number,
      index: true,
    },
    sireEarTag: {
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
  return this.gender === "female" && this.age >= 2;
};

// Add static method to find all lactating cows
cowSchema.statics.findLactatingCattle = function () {
  return this.find({
    gender: "female",
    status: "active",
    lactating: true,
  });
};

cowSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  indexFields: ["deleted", "deletedAt"],
});

module.exports = mongoose.model("Cow", cowSchema);
