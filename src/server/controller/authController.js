const express = require('express');
const util = require('util');
const moment = require('moment');
const _ = require('lodash');
const config = require('../config');
const router = express.Router();

const { respondJson, respondOnError } = require('../utils/respond');
const { authModel } = require('../model');
const resultCode = require('../utils/resultCode');
const { parameterFormCheck, getUrl, encrypt, decrypt } = require('../utils/common');
const { authRq } = require('../utils/requestForm');

const controllerName = 'Auth';

router.use((req, res, next) => {
  console.log(util.format('[Logger]::[Controller]::[%sController]::[Access Ip %s]::[Access Time %s]',
                              controllerName,
                              req.ip,
                              moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                          ));

                          log(req.body);
  go(
    req.body || req.params || req.query,
    parameterFormCheck,
    f => f(authRq[getUrl(req.originalUrl)]),
    result => result
    ? next()
    : respondOnError(res, resultCode.incorrectParamForm, { desc: "Incorrect Parameter Form" })
  );
});

router.post('/login', async (req, res) => {
  try {
    const { account = false, password = false } = req.body;
    if (!account || !password) { throw { message: 'Incorrect Information!' }; };

    const options = {
      where : {
        account: account,
        password: encrypt(password)
      }
    };

    accountInfo = await go(
      options,
      authModel.find,
      result => result.length > 0 ? result[0].dataValues : result
    );

    !!accountInfo.id
    ? ((account) => {

      req.session.auth = account.id; // api 호출 시 체크할 값
      req.session.cookie.maxAge = config.server.session_maxAge;      

      return respondJson(res, resultCode.success, 'Login Success');
     })(accountInfo) 
    : respondOnError(res, resultCode.error, 'Invalid User');
  } catch (error) {
    respondOnError(res, resultCode.error, error.message);
  }
});

router.post('/logout', async (req, res) => {
  try {
    req.session.destroy();
    return respondJson(res, resultCode.success, 'Logout Success');
  } catch (error) {
    respondOnError(res, resultCode.error, error.message);
  }
});

router.post('/check', async (req, res) => {
  try {
    if (req.session.auth) {
      return respondJson(res, resultCode.success, 'Alive Session');
    } else {
      return respondOnError(res, resultCode.sessionError, 'Not Alive Session');
    }
  } catch (error) {
    respondOnError(res, resultCode.error, error.message);
  }
});

module.exports = router;
