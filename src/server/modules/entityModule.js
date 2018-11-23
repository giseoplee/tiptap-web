const util = require('util');
const moment = require('moment');
const { user, diary, notification, blame, version, push, manager } = require('../entity');

const EntityModule = (function (){
  return {
    Init: function () {
        diary.belongsTo(user, { foreignKey : 'user_id', onUpdate : 'CASCADE', onDelete: 'CASCADE' });
        diary.hasMany(blame, { foreignKey : 'content_id', onUpdate : 'CASCADE', onDelete: 'CASCADE'  });
        user.hasMany(notification, { foreignKey : 'user_id', onUpdate : 'CASCADE' });
        user.hasMany(notification, { foreignKey : 'send_user_id', onUpdate : 'CASCADE' });
        user.hasMany(blame, { foreignKey : 'user_id', onUpdate : 'CASCADE' });
        user.hasMany(blame, { foreignKey : 'target_user_id', onUpdate : 'CASCADE' });

        blame.belongsTo(diary, { foreignKey : 'content_id', onUpdate : 'CASCADE', onDelete: 'CASCADE' });
        blame.belongsTo(user, { foreignKey : 'user_id', onUpdate : 'CASCADE', onDelete: 'CASCADE', as: 'reporterUser' });
        blame.belongsTo(user, { foreignKey : 'target_user_id', onUpdate : 'CASCADE', onDelete: 'CASCADE', as: 'reportedUser' });

        version.sync();
        manager.sync();
        user.sync()
        .then(() => {
          diary.sync().then(() => {
            blame.sync();
          });
          notification.sync();
          push.sync();
          console.log(util.format('[Logger]::[Entity]::[Service]::[%s]::[Initialized]',
                                    moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
        })
        .catch(e => console.log(util.format('[Logger]::[EntityService Error]::[Access Time %s]::[%s]',
                                    moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'), e
                                )));
    }
  }
})();

module.exports = EntityModule;

