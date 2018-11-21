const csurf = require('csurf');
const util = require('util');
const moment = require('moment');
const csrfProtection = new csurf({ cookie: true });
const config = require('../config');
const { blameCtrl, authCtrl } = require('../controller');
const { respondOnError } = require('../utils/respond');
const resultCode = require('../utils/resultCode');

const RoutesModule = (function (){
  return {
    Init: function () {

      // app.use(csrfProtection);
      app.use((req, res, next) => {

          if (!req.session.auth && req.originalUrl !== '/api/auth/login') {
            respondOnError(res, resultCode.sessionError, 'Not Alive Session');
          }

          res.header('Access-Control-Allow-Origin', config.server.accept_domain);
          res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          console.log(util.format('[Logger]::[Route]::[Access URL %s]::[Access Ip %s]::[Access Time %s]',
                                      req.originalUrl,
                                      req.ip,
                                      moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                                  ));
          next();
      });

      // app.get('*', (req, res) => {
      //   log(req.originalUrl);
      //   res.sendFile(path.join(__dirname+'../../dist/index.html'));
      // });
      app.use('/api/auth', authCtrl);
      app.use('/api/blame', blameCtrl);
      console.log(util.format('[Logger]::[Route]::[Service]::[%s]::[Started]',
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
    }
  }
})();

module.exports = RoutesModule;
