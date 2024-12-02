const { Container } = require("inversify");

const { UserService } = require("../services/user");
const { UserController } = require("../api/controllers/user");

function getContainer() {
  const container = new Container();

  container.bind(UserService).to(UserService);
  container.bind(UserController).to(UserController);

  return container;
}

module.exports = getContainer;
