const express = require('express');
const util = require('util');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const router = express.Router();

const { respondJson, respondOnError } = require('../utils/respond');
const { updateValue } = require('../modules/redisModule');
const { blameModel, userModel, diaryModel } = require('../model');
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
        where: { status: 1 },
        order: [['updatedAt', 'DESC']],
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
    return respondOnError(res, resultCode.error, error.message);
  }
});

router.get('/blocked/list/:page', async (req, res) => {
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
        where: { status: 0 },
        order: [['updatedAt', 'DESC']],
        offset: BEGIN,
        limit: SIZE 
      };
    };

    return go(
      blameModel.getBlockedUserCount(),
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
    return respondOnError(res, resultCode.error, error.message);
  }
});

router.post('/user/update', async (req, res) => {
  try {
    const { id, status, target_user_id, target_user_token, content_id } = req.body;
    return await go(
      target_user_id,
      async userId => {
        const options = {
          where: {
            id: userId
          },
          data: {
            status: status
          }
        };
        return await userModel.update(options).catch(e => { throw e });
      },
      _ => target_user_token,
      async userToken => await updateValue(userToken, { key: 'status' ,value: status > 0 ? true : false }),
      _ => content_id,
      async diaryId => {
        const options = {
          where: {
            id: diaryId
          },
          data: {
            shared: 0
          }
        };
        return await diaryModel.update(options).catch(e => { throw e });
      },
      _ => id,
      async blameContentId => {
        const options = {
          where: {
            id: blameContentId
          },
          data: {
            status: status > 0 ? 2 : status
          }
        };
        return await blameModel.update(options).catch(e => { throw e });
      },
      result => respondJson(res, resultCode.success, { data: result })
    );
  } catch (error) {
    return respondOnError(res, resultCode.error, error.message);
  }
})

module.exports = router;
