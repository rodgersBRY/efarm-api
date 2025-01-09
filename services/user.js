const logger = require("../config/logger");
const UserModel = require("../models/user");
const lodash = require("lodash");
const { throwError } = require("../util/error");

class UserService {
  async create(data) {
    try {
      const { email } = data;

      const userExists = await this.findOne({ email });
      if (userExists) throwError("account exists!", 409);

      const user = await UserModel.create(data);

      logger.info("user-created: %o", user._id);

      return user;
    } catch (err) {
      logger.error("user-creation-error %o", err.message);
      throw err;
    }
  }

  async update(id, data) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, data).exec();

      logger.info("user-updated: %o", user._id);

      return user;
    } catch (err) {
      logger.error("user-update-error %o", err.message);
      throw err;
    }
  }

  async findById(id) {
    try {
      const user = await UserModel.findById(id);

      return user;
    } catch (err) {
      logger.error("user-fetch-error %o", err.message);
    }
  }

  async findOne(query) {
    try {
      const user = await UserModel.findOne(query);

      return user;
    } catch (err) {
      logger.error("user-fetch-error %o", err.message);
    }
  }
}

module.exports = { UserService };
