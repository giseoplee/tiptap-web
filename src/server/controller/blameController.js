const express = require('express');
const util = require('util');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
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
    f => f(blameRq[getUrl(req.originalUrl)] || false),
    result => result
    ? next()
    : respondOnError(res, resultCode.incorrectParamForm, {desc: "incorrect parameter form"})
  );
});

router.get('/list/:page', async (req, res) => {
  try {
    let { page = 1 } = req.params;
    page = parseInt(page);

    const SIZE = 10;
    const PAGE_SIZE = 10;
    const BEGIN = (page - 1) * 10;

    let totalPage;
    let startPage;
    let endPage;
    let totalItems

    const tableRange = cnt => {
      totalItems = cnt;
      totalPage = Math.ceil(cnt / SIZE);
      startPage = Math.floor((page - 1) / PAGE_SIZE) * PAGE_SIZE + 1;
      endPage = startPage + (PAGE_SIZE - 1);
      if (endPage > totalPage) endPage = totalPage;
      return {
        order: [['id', 'DESC']],
        offset: BEGIN,
        limit: SIZE 
      };
    };

    return go(
      blameModel.getBlameUserCount(),
      tableRange,
      blameModel.getList,
      result => {
        const responseData = {
          pageSize: PAGE_SIZE,
          page: page,
          startPage: startPage,
          endPage: endPage,
          totalPage: totalPage,
          totalItems: totalItems,
          datas: result
        };
        return respondJson(res, resultCode.success, responseData);
      }
    );
  } catch (error) {
    respondOnError(res, resultCode.error, error.message);
  }
});

module.exports = router;
