const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwError } = require("../helpers/error");
const { JWT_SECRET_TOKEN } = require("../config/env");

const AuthService = require("../services/user");

const authService = new AuthService();

exports.getUsers = async (_, res, __) => {
  const users = await authService.get();

  res.status(200).json({ users });
};

exports.register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    if (!email || !password)
      throwError("email and password fields are required", 400);

    const userExists = await authService.findOne({ email });
    if (userExists) throwError("account exists", 409);

    if (password.length < 7)
      throwError("Password should be more than 7 characters long", 400);

    const user = await authService.create({
      name,
      email,
      password,
      phone,
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authService.findOne({ email });
    if (!user) throwError("account not found", 404);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throwError("Wrong password!", 401);

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ userId: user._id, user, token });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { email } = req.query;

  try {
    const updatedUser = await authService.update({ email }, req.body);
    res.status(201).json({ updatedUser });
  } catch (err) {
    next(err);
  }
};
