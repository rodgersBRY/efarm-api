const logger = require("../config/logger");

class CowEvents {
  constructor(cowService) {
    this.cowService = cowService;

    cowService.on("cow-created", this.handleCowCreated);
    cowService.on("cow-updated", this.handleCowUpdated);
    cowService.on("cow-deleted", this.handleCowDeleted);
    cowService.on("cow-offspring-added", this.handleOffspringAdded);
  }

  handleCowCreated(cow) {
    logger.info("cow-created %o", cow);
  }

  handleCowUpdated(cow) {
    logger.info("cow-updated %o", cow);
  }

  handleCowDeleted(cow) {
    logger.info("cow-deleted %o", cow);
  }

  handleOffspringAdded({ parent, offspring }) {
    logger.info("Offspring added: %o", {
      parentId: parent._id,
      parentTag: parent.tagNo,
      offspringTag: offspring.tagNo,
      timestamp: new Date(),
    });
  }
}

module.exports = CowEvents;
