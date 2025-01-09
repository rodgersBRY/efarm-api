const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserService } = require("../../services/user");
const { throwError } = require("../../util/error");
const { JWT_SECRET_TOKEN } = require("../../loader/env");
const Bcrypt = require("../../util/bcrypt");

const userService = new UserService();

exports.user = async (req, res, next) => {
  try {
    const user = await userService.findOne(req.query);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    
    const user = await userService.update(req.params.id, req.body);

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
