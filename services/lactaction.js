const LactationModel = require("../models/lactation");
const logger = require("../utils/logger");
const _ = require("lodash");
const { throwError } = require("../utils/error");

class LactationService {
  async create(data) {
    try {
      if (_.isEmpty(data)) throwError("Lactation data is required", 401);

      const lactationRecord = await LactationModel.create(data);

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

      logger.info(
        "total records: %o page: %o pages: %o",
        records.length,
        parseInt(opts.page),
        Math.ceil(records.length / opts.limit)
      );

      return {
        records,
        pagination: {
          total: records.length,
          page: parseInt(opts.page),
          pages: Math.ceil(records.length / opts.limit),
        },
      };
    } catch (err) {
      logger.error("error-fetching-records: %o", err);
    }
  }

  async findById(id) {
    try {
      const record = await LactationModel.findOne({ _id: id });

      return record;
    } catch (err) {
      logger.error("error-fetching-record: %o", err);
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

  async delete(id) {
    try {
      const record = await this.findById(id);
      if (!record) throwError("Record not found", 404);

      record.softDelete();

      logger.info("record-deleted: %o", record._id);

      return record;
    } catch (err) {
      logger.error("error-deleting-record: %o", err);
      throw new Error(err);
    }
  }
  
  async restore(id) {
    try {
      const record = await this.findById(id);
      if (!record) throwError("Record not found", 404);

      record.restore();

      logger.info("record-restored: %o", record._id);

      return record;
    } catch (err) {
      logger.error("error-restoring-record: %o", err);
      throw new Error(err);
    }
  }
}

module.exports = LactationService;
