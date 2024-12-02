const logger = require("../config/logger");
const UserModel = require("../models/user");
const lodash = require("lodash");

class UserService {
  async create(data) {
    try {
      const { email } = data;

      const user = await UserModel.findOneAndUpdate(
        { email },
        { $set: lodash.omitBy(data, lodash.isNil) },
        { new: true, upsert: true }
      );

      logger.info("user-created: %o", user._id);

      return user;
    } catch (err) {
      logger.error("user-creation-error %o", err);
    }
  }

  async findById(id) {
    try {
      const user = await UserModel.findById(id);

      return user;
    } catch (err) {
      logger.error("user-fetch-error %o", err);
    }
  }

  async findOne(query) {
    try {
      const user = await UserModel.findOne(query);

      return user;
    } catch (err) {
      logger.error("user-fetch-error %o", err);
    }
  }
}

module.exports = { UserService };
