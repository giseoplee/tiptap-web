const authController = require('../controller/authController');
const accountController = require('../controller/accountController');
const diaryController = require('../controller/diaryController');
const blameController = require('../controller/blameController');

module.exports = {
  authCtrl: authController,
  accountCtrl: accountController,
  diaryCtrl: diaryController,
  blameCtrl: blameController
}
