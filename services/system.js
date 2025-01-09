const logger = require("../config/logger");
const { ADMIN_EMAIL, ADMIN_PASS, INIT_ADMIN } = require("../loader/env");
const { UserService } = require("./user");

const userService = new UserService();

class SystemService {
  async init() {
    try {
      logger.info("system-init");

      if (INIT_ADMIN == "enabled") await this.createAdminUser();
    } catch (err) {
      logger.error("system-init: %o", err);
    }
  }

  async createAdminUser() {
    logger.info("admin-create");

    const adminUser = {
      name: "Brian Mawira",
      email: ADMIN_EMAIL,
      password: ADMIN_PASS,
      role: "admin",
    };

    try {
      const admin = await userService.create(adminUser);

      if (admin) {
        logger.info("admin-created %o", admin._id);
      }
    } catch (err) {
      logger.error("admin-create-error: %o", err.message);
    }
  }
}

module.exports = SystemService;
