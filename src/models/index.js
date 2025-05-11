const UserField = require('./User');
const DetailUserField = require('./DetailUser');
const { db } = require('../config/database');

const User = db.define('users', UserField,{
    tableName: 'users',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const DetailUser = db.define('detail_users',DetailUserField, {
    tableName: 'detail_users',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

User.hasOne(DetailUser, { foreignKey: 'userId' });
DetailUser.hasOne(User, { foreignKey: 'id' });

module.exports = {
  User,
  DetailUser
};
