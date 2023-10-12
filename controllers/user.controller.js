const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) throwError("An account with that email exists!", 409);

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPass,
      role: role || "farmer",
    });

    const resp = await newUser.save();
    res.status(201).json({ msg: "successfully registered!", resp });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) throwError("User not found!", 404);

    let loadedUser = user;

    const passMatch = await bcrypt.compare(password, loadedUser.password);
    if (!passMatch) throwError("Wrong password!", 401);

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET_TOKEN
    );

    res.status(200).json({
      userId: loadedUser._id.toString(),
      loadedUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const throwError = function (errorText, errorCode) {
  const error = new Error(errorText);
  error.status = errorCode;
  throw error;
};
