const Cow = require("../models/cow.model");
const MilkRecord = require("../models/milking.model");

// fetch all cows in the db
exports.getCows = async (_, res, next) => {
  try {
    const cows = await Cow.find();

    if (!cows) throwError("No records found", 404);

    return res.status(200).json(cows);
  } catch (err) {
    next(err);
  }
};

exports.getMilkedCows = async (_, res, next) => {
  try {
    const milkedCows = await Cow.find({ milked: true });

    if (!milkedCows) throwError("No records found!", 404);

    return res.status(200).json(milkedCows);
  } catch (err) {
    next(err);
  }
};

// create a new cow in the db
exports.addCow = async (req, res, next) => {
  const {
    breed,
    name,
    tagNo,
    gender,
    weight,
    fatherTag,
    motherTag,
    dob,
    modeOfAcquiring,
    milked,
    notes,
  } = req.body;

  try {
    const cowExists = await Cow.findOne({ tagNo: tagNo });

    if (cowExists)
      throwError(
        `That tag number is already awarded to the cow ${cowExists.name}`,
        409
      );

    // call functions to check and add the cow to offspring list
    if (motherTag) await addMotherOffspring(motherTag, tagNo, name);
    if (fatherTag) await addFatherOffspring(fatherTag, tagNo, name);

    // create a new instance of cow model
    const cow = new Cow({
      breed: breed,
      name: name,
      gender: gender,
      tagNo: tagNo,
      weight: weight,
      dob: dob,
      motherTag: motherTag,
      milked: milked,
      fatherTag: fatherTag,
      modeOfAcquiring: modeOfAcquiring,
      notes: notes,
    });

    await cow.save();

    return res.status(201).json({ msg: "Cow was added to database" });
  } catch (err) {
    next(err);
  }
};

// delete a cow by the tag no
exports.deleteCow = async (req, res, next) => {
  const tagNo = req.params.tagNo;

  try {
    // delete the cow from the cow collection
    const cow = await Cow.findOneAndRemove({ tagNo: tagNo });

    if (!cow) throwError("Cow does not exist", 404);

    // delete all milk records for that cow
    await MilkRecord.deleteMany({ tagNo: tagNo });

    return res
      .status(204)
      .json({ message: `${cow.name} deleted successfully` });
  } catch (err) {
    next(err);
  }
};

// edit cow details
exports.editCowDetails = async (req, res, next) => {
  const cowId = req.params.cowId;

  const { breed, name, tagNo, milked, weight, modeOfAcquiring, notes } =
    req.body;

  try {
    const cow = await Cow.findById(cowId);

    if (!cow) throwError("Record not found!", 404);

    cow.breed = breed;
    cow.name = name;
    cow.tagNo = tagNo;
    cow.weight = weight;
    cow.milked = milked;
    cow.modeOfAcquiring = modeOfAcquiring;
    cow.notes = notes;

    const result = await cow.save();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// add cow to list off mother offspring
const addMotherOffspring = async function (motherTag, tagNo, name) {
  try {
    const motherCow = await Cow.findOne({ tagNo: motherTag });

    if (motherCow) {
      const offspring = {
        tagNo: tagNo,
        name: name,
      };

      // add the offspring to the mother
      const cowsOffspring = [...motherCow.offspring];
      cowsOffspring.push(offspring);

      motherCow.offspring = cowsOffspring;

      await motherCow.save();
    }
  } catch (err) {
    next(err);
  }
};

// add cow to list off father offspring
const addFatherOffspring = async function (fatherTag, tagNo, name) {
  try {
    const fatherCow = await Cow.findOne({ tagNo: fatherTag });

    if (fatherCow) {
      const offspring = {
        tagNo: tagNo,
        name: name,
      };

      // add the offspring to the mother
      const cowsOffspring = [...fatherCow.offspring];
      cowsOffspring.push(offspring);

      fatherCow.offspring = cowsOffspring;

      await fatherCow.save();
    }
  } catch (err) {
    next(err);
  }
};

const throwError = function (errorText, errorCode) {
  const error = new Error(errorText);
  error.status = errorCode;
  throw error;
};
