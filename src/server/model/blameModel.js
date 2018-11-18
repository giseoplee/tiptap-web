const { blame } = require('../entity');

const blameModel = (function () {
  return {
    getList: async function() {
        const options = {};
        options.order = [['id', 'DESC']];
        return await blame.findAll(options);
    }
  }
})();

module.exports = blameModel;
