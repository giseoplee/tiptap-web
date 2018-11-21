const session = require('express-session');
const redisStore = require('connect-redis')(session);
const config = require('../config');

const SessionModule = (function () {
  const setting = {
    store: new redisStore({
      key: 'bot_builder',
      port: config.redis.redisPort,
      host: config.redis.redisHost,
      password: config.redis.redisPassword,
      db: 1,
      ttl: config.server.session_ttl
    }),
    name: 'strawberry',
    secret: config.server.auth_key,
    resave: false, //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: false,  //세션 아이디를 실제 사용하기전에는 발급하지 않음
    // cookie: {
    //   secure: true
    // }
  };
  return {
    Init: function () {
      app.set('trust proxy', 1);
      app.use(session(setting));
    }
  }
})();

module.exports = SessionModule;
