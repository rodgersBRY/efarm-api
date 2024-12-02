const bcrypt = require("bcrypt");

 class Bcrypt {
  hashPassword(password) {
    return bcrypt.hashSync(password, 12);
  }

  comparePasswords(password, userPassword) {
    return bcrypt.compare(password, userPassword);
  }
}

module.exports = { Bcrypt };
