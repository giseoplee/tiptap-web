const csurf = require('csurf');
const util = require('util');
const moment = require('moment');
const path = require('path');

const config = require('../config');
const { blameCtrl, authCtrl } = require('../controller');
const { respondOnError } = require('../utils/respond');
const resultCode = require('../utils/resultCode');
const distDir = path.resolve(__dirname, '../../../', 'dist', 'index.html');


const RoutesModule = (function() {
  return {
    Init: function () {
      app.get('*', (req, res) => {
        res.sendFile(distDir);
      });
      
      app.use((req, res, next) => {
        if (!req.session.auth && req.originalUrl !== '/api/auth/login') {
          respondOnError(res, resultCode.sessionError, 'Not Alive Session');
        } else {
          res.header('Access-Control-Allow-Origin', config.server.accept_domain);
          res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          console.log(util.format('[Logger]::[Route]::[Access URL %s]::[Access Ip %s]::[Access Time %s]',
                                      req.originalUrl,
                                      req.ip,
                                      moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                                  ));
          next();
        }
      });

      app.use('/api/auth', authCtrl);
      app.use('/api/blame', blameCtrl);
    }
  }
})();

module.exports = RoutesModule;
