const express = require('express');
const util = require('util');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const _ = require('lodash');
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

    if (!account || !password) {
      throw { message: 'Incorrect Information!' };
    }

    const options = {
      where : {
        account: account,
        password: encrypt(password)
      }
    };

    accountRow = await go(
      options,
      authModel.find
    );

    accountRow.length > 0
    ? (() => {
      req.session.auth = true;
      return respondJson(res, resultCode.success, 'Login Success');
     })() 
    : respondOnError(res, resultCode.error, 'Invalid User');
  } catch (error) {
    respondOnError(res, resultCode.error, error.message);
  }
});

module.exports = router;
