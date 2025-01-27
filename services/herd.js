const HerdModel = require("../models/herd");
const _ = require("lodash");
const logger = require("../config/logger");
const { throwError } = require("../util/error");

class HerdService {
  async create(herdData) {
    try {
      if (_.isEmpty(herdData)) throwError("Herd data is required", 401);

      const herd = await HerdModel.findOneAndUpdate(
        { name: herdData.name },
        { $set: _.omitBy(herdData, _.isNil) },
        { upsert: true, new: true }
      ).exec();

      logger.info("herd-created: %o", herd._id);

      return herd;
    } catch (err) {
      logger.error("herd-creation-error: %o", err);
    }
  }

  async get(query = {}, options = {}) {
    try {
      const opts = _.defaults(options, {
        page: 1,
        limit: 20,
        sort: "-createdAt",
      });

      const skip = (opts.page - 1) * opts.limit;

      const herds = await HerdModel.find(query)
        .sort(opts.sort)
        .skip(skip)
        .limit(opts.limit)
        .exec();

      const total = await HerdModel.countDocuments(query);

      logger.info(
        "total herds: %o page: %o pages: %o",
        total,
        parseInt(opts.page),
        Math.ceil(total / opts.limit)
      );

      return {
        herds,
        pagination: {
          total,
          page: parseInt(opts.page),
          pages: Math.ceil(total / opts.limit),
        },
      };
    } catch (err) {
      logger.error("herd-fetch-error: %o", err.message);
    }
  }

  async findById(id) {
    try {
      const herd = await HerdModel.findById(id).exec();

      if (!herd) {
        throw new Error("herd not found");
      }

      logger.info("herd-data %o", herd);
      return herd;
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findOne(query) {
    try {
      const herd = await HerdModel.findOne(query).exec();

      if (!herd) {
        throw new Error("herd not found");
      }

      logger.info("herd-data %o", herd);

      return herd;
    } catch (error) {
      logger.error("herd-fetch-error: %o", error.message);
    }
  }

  async update(id, updateData) {
    try {
      const herd = await HerdModel.findByIdAndUpdate(
        id,
        { $set: _.omitBy(updateData, _.isNil) },
        { new: true, runValidators: true, upsert: true }
      ).exec();

      if (!herd) {
        throw new Error("herd not found");
      }

      return herd;
    } catch (error) {
      logger.error("herd-update-error: %o", error.message);

      throw new Error("Error updating herd", error.message);
    }
  }

  async delete(id) {
    try {
      const herd = await HerdModel.findByIdAndUpdate(id, {
          deleted: true,
          deletedAt: new Date(),
        })
        .exec();
      
      if (!herd) throw new Error("herd not found");

      logger.info("herd-deleted: %o", herd);

      return herd;
    } catch (error) {
      logger.error("error-deleting-herd: %o", error.message);

      throw new Error("Error deleting herd", error.message);
    }
  }

  async restore(id) {
    try {
      const herd = await HerdModel.findByIdAndUpdate(id, {
        deleted: false,
        deletedAt: null,
        })
        .exec();
      
      if (!herd) throw new Error("herd not found");

      logger.info("herd-restored: %o", herd);

      return herd;
    } catch (error) {
      logger.error("error-restoring-herd: %o", error.message);

      throw new Error("Error restoring herd", error.message);
    }
  }

  async findWithDeleted(query = {}) {
    try {
      const herds = await HerdModel.findWithDeleted(query).exec();

      logger.info("herds-deleted: %o", herds);

      return herds;
    } catch (error) {
      logger.error("error-fetching-deleted-herds: %o", error.message);

      throw new Error("Error fetching deleted herds", error.message);
    }
  }
}

module.exports = { HerdService };
