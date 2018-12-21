const { blame, user, diary } = require('../entity');
const { query } = require('../modules/dbModule');

const blameModel = (function () {
  return {
    create: async function(data) {
      return await blame.create(data);
    },
    update: async function(options) {
        const { data, where } = options;
        return await blame.update(data, {
            where: where
        });
    },
    findOne: async function(options) {
        return await blame.findOne(options);
    },
    find: async function(options) {
        return await blame.findAll(options);
    },
    getList: async function(options) {
      options.include = [
        {
          model: diary
        },
        {
          model: user,
          as: 'reporterUser'
        },
        {
          model: user,
          as: 'reportedUser'
        }
      ];
      return await blame.findAll(options);
    },
    getBlameUserCount: async function() {
      return go(
        null,
        _ => `select count(id) as count from blames where status = 1;`,
        queryString => query(queryString),
        row => row[0].count
      );
    },
    getBlockedUserCount: async function() {
      return go(
        null,
        _ => `select count(id) as count from blames where status = 0;`,
        queryString => query(queryString),
        row => row[0].count
      );
    }
  }
})();

module.exports = blameModel;
