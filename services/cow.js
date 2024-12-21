const CowModel = require("../models/cow");
const _ = require("lodash");
const logger = require("../utils/logger");
const { throwError } = require("../utils/error");

class CowService {
  async create(cowData) {
    try {
      if (_.isEmpty(cowData)) throwError("Cow data is required", 401);

      const cow = await CowModel.findOneAndUpdate(
        { tagNo: cowData.tagNo },
        { $set: _.omitBy(cowData, _.isNil) },
        { upsert: true, new: true }
      );

      logger.info("cow-created: %o", cow._id);

      return cow;
    } catch (err) {
      logger.error("cow-creation-error: %o", err);
    }
  }

  async get(query = {}, options = {}) {
    try {
      const opts = _.defaults(options, {
        page: 1,
        limit: 10,
        sort: "-createdAt",
      });

      const skip = (opts.page - 1) * opts.limit;

      const cows = await CowModel.find(query)
        .sort(opts.sort)
        .skip(skip)
        .limit(opts.limit)
        .exec();

      const total = await CowModel.countDocuments(query);

      logger.info(
        "total cows: %o page: %o pages: %o",
        cows.length,
        parseInt(opts.page),
        Math.ceil(total / opts.limit)
      );

      return {
        cows,
        pagination: {
          total: cows.length,
          page: parseInt(opts.page),
          pages: Math.ceil(total / opts.limit),
        },
      };
    } catch (err) {
      logger.error("cow-fetch-error: %o", err.message);
    }
  }

  async findById(id) {
    try {
      const cow = await CowModel.findById(id).exec();
      if (cow) {
        logger.info("cow-data %o", cow._id);
        return cow;
      }
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findOne(query) {
    try {
      const cow = await CowModel.findOne({ ...query, deleted: false }).lean();
      if (!cow) {
        throw new Error("Cow not found");
      }
      return cow;
    } catch (error) {
      throw new Error(`Error fetching cow: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const cow = await CowModel.findByIdAndUpdate(
        id,
        {
          $set: _.omitBy(updateData, _.isNil),
        },
        {
          new: true,
          runValidators: true,
          upsert: true,
        }
      ).exec();

      if (!cow) {
        throw new Error("Cow not found");
      }
      return cow;
    } catch (error) {
      throw new Error(`Error updating cow: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const cow = await this.findById(id);
      if (!cow) throw new Error("Cow not found");

      cow.softDelete();

      logger.info("cow-deleted: %o", cow._id);

      return cow;
    } catch (error) {
      logger.error("error-deleting-cow: %o", error.message);
    }
  }

  async restore(id) {
    try {
      const cow = await this.findById(id);
      if (!cow) throw new Error("Cow not found");

      cow.restore();

      logger.info("cow-restored: %o", cow);

      return cow;
    } catch (error) {
      logger.error("error-restoring-cow: %o", error.message);
      throw new Error(`Error restoring cow: ${error.message}`);
    }
  }

  // add cow to list off mother offspring
  async addOffspring(parentTag, id) {
    try {
      const parentCow = await CowModel.findOne({ tagNo: parentTag });

      if (parentCow) {
        // add the offspring to the parent
        const cowsOffspring = [...parentCow.offspring];
        cowsOffspring.push(id);

        parentCow.offspring = cowsOffspring;

        await parentCow.save();
      }
    } catch (err) {
      next(err);
    }
  }

  async findWithDeleted(query = {}) {
    try {
      return await CowModel.findWithDeleted(query);
    } catch (error) {
      throw new Error(`Error fetching deleted cows: ${error.message}`);
    }
  }
}

module.exports = CowService;
