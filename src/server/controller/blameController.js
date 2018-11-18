const express = require('express');
const util = require('util');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const _ = require('lodash');
const router = express.Router();

const { respondJson, respondOnError } = require('../utils/respond');
const { getValue, setValue, setDefaultKey, setFirstAuth } = require('../modules/redisModule');
const { blameModel } = require('../model');
const resultCode = require('../utils/resultCode');
const { parameterFormCheck, getUrl } = require('../utils/common');
const { blameRq } = require('../utils/requestForm');

const controllerName = 'Blame';

router.use((req, res, next) => {

  console.log(util.format('[Logger]::[Controller]::[%sController]::[Access Ip %s]::[Access Time %s]',
                              controllerName,
                              req.ip,
                              moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                          ));
  go(
    req.body || req.params || req.query,
    parameterFormCheck,
    f => f(blameRq[getUrl(req.originalUrl)]),
    result => result
    ? next()
    : respondOnError(res, resultCode.incorrectParamForm, {desc: "incorrect parameter form"})
  );
});

router.get('/list', async (req, res) => {
  try {
    go(
      null,
      blameModel.getList,
      result => respondJson(res, resultCode.success, { data: result })
    );
  } catch (error) {
    respondOnError(res, resultCode.error, error.message);
  }
});

module.exports = router;
