const bcrypt = require("bcrypt");
const { throwError } = require("../helpers/error");
const { addUser, update, getUser, getUsers } = require("../models/user");
const logger = require("../utils/logger");

class AuthService {
  async create({ name, email, password, phone, role }) {
    try {
      const hashedPass = await bcrypt.hash(password, 12);

      const userData = {
        name,
        email,
        phone,
        password: hashedPass,
        role: role,
      };

      const { _id } = await addUser({ email }, userData);

      const user = await this.findOne({ _id: _id });

      logger.info("user-created %o", user._id);

      return user;
    } catch (err) {
      logger.error("new-user-error %o", err);
      throw err;
    }
  }

  async get() {
    const users = await getUsers();
    if (!users) throwError("Error fetching users", 404);

    logger.info("fetched-users %o", users.length);

    return users;
  }

  async findOne(query) {
    try {
      const user = await getUser(query);

      if (user) return user;
    } catch (err) {
      logger.error("get-user-error %o", err);
      throw err;
    }
  }

  async update(query, userData) {
    try {
      if (userData.password) {
        const hashedPass = await bcrypt.hash(userData.password, 12);
        userData.password = hashedPass;
      }

      const updatedUser = await addUser(query, userData);

      logger.info("user-updated: %o", updatedUser._id);

      return updatedUser;
    } catch (err) {
      logger.info("update-user-error %o", err);
      throw err;
    }
  }
}

module.exports = AuthService;
