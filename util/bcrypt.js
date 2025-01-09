const bcrypt = require("bcrypt");

 class Bcrypt {
  async hashPassword(password) {
    return bcrypt.hashSync(password, 12);
  }

  async comparePasswords(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }
}

module.exports = Bcrypt;
