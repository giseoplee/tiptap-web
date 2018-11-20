const { manager } = require('../entity');

const authModel = (function () {
  return {
    create: async function(data) {
        return await manager.create(data);
    },
    update: async function(options) {
        const { data, where } = options;
        return await manager.update(data, {
            where: where
        });
    },
    findOne: async function(options) {
        return await manager.findOne(options);
    },
    find: async function(options) {
        return await manager.findAll(options);
    }
  }
})();

module.exports = authModel;