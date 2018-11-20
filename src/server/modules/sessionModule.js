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
      ttl: 60
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
