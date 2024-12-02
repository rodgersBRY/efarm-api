const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserService } = require("../../services/user");
const { throwError } = require("../../util/error");
const { JWT_SECRET_TOKEN } = require("../../loader/env");
const logger = require("../../config/logger");
const { Bcrypt } = require("../../util/bcrypt");

const userService = new UserService();
const bcryptService = new Bcrypt();

exports.register = async (req, res, next) => {
  try {
    const data = req.body;

    const hashedPassword = bcryptService.hashPassword(data.password);

    const user = await userService.create({
      ...data,
      password: hashedPassword,
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findOne({ email });

    if (!user) throwError("User not found!", 404);

    let loadedUser = user;

    const passMatch = bcryptService.comparePasswords(
      password,
      loadedUser.password
    );
    
    if (!passMatch) throwError("Wrong password!", 401);

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      JWT_SECRET_TOKEN
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
