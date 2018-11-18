const session = require('express-session');
const redisStore = require('connect-redis')(session);
const config = require('../config');

const SessionModule = (function () {
  const setting = {
    store: new redisStore({
      port: config.redis.redisPort,
      host: config.redis.redisHost,
      password: config.redis.redisPassword,
      ttl: 21600,
      logErrors: true
    }),
    secret: config.server.auth_key,
    resave: false,
    saveUninitialized: false
  };
  return {
    Init: function () {
      app.set('trust proxy', 1);
      app.use(session(setting));
    }
  }
})();

module.exports = SessionModule;
