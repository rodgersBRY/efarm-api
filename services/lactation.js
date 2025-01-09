const LactationModel = require("../models/lactation");
const logger = require("../config/logger");
const _ = require("lodash");
const { throwError } = require("../util/error");

class LactationService {
  async create(data) {
    try {
      if (_.isEmpty(data)) throwError("Lactation data is required", 401);

      const lactationRecord = await LactationModel.findOneAndUpdate(
        { tagNo: data.tagNo },
        { $set: _.omitBy(data, _.isNil) },
        { upsert: true, new: true }
      );

      logger.info("record-created: %o", lactationRecord._id);

      return lactationRecord;
    } catch (err) {
      logger.error("error-creating-record: %o", err);
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

      const records = await LactationModel.find(query)
        .sort(opts.sort)
        .skip(skip)
        .limit(opts.limit)
        .exec();

      const total = await LactationModel.countDocuments(query);

      return {
        records,
        pagination: {
          total,
          page: parseInt(opts.page),
          pages: Math.ceil(total / opts.limit),
        },
      };
    } catch (err) {
      logger.error("error-fetching-records: %o", err);
    }
  }

  async update(query, updateData) {
    try {
      const record = await LactationModel.findOneAndUpdate(query, {
        $set: _.omitBy(updateData, _.isNil),
      });

      logger.info("record-updated: %o", record._id);

      return record;
    } catch (err) {
      logger.error("error-updating-record: %o", err);
    }
  }

  async delete(query) {
    try {
      const record = await LactationModel.findOneAndUpdate(query, {
        deleted: true,
        deletedAt: new Date(),
      });

      if (!record) throwError("Record not found", 404);

      logger.info("record-deleted: %o", record._id);

      return record;
    } catch (err) {
      logger.error("error-deleting-record: %o", err);
      throw new Error(err);
    }
  }

  async restore(id) {
    try {
      const record = await LactationModel.findByIdAndUpdate(id, {
        deleted: false,
        deletedAt: null,
      });

      if (!record) throwError("Record not found", 404);

      logger.info("record-restored: %o", record._id);

      return record;
    } catch (err) {
      logger.error("error-restoring-record: %o", err);
      throw new Error(err);
    }
  }
}

module.exports = LactationService;
