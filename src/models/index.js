const UserField = require('./User');
const DetailUserField = require('./DetailUser');
const GeneralInformationField = require('./GeneralInformation');
const SpecialistField = require('./Specialist');
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

const GeneralInformation = db.define('general_informations',GeneralInformationField, {
    tableName: 'general_informations',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const Specialist = db.define('specialists',SpecialistField, {
    tableName: 'specialists',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

User.hasOne(DetailUser, { foreignKey: 'user_id' });
DetailUser.hasOne(User, { foreignKey: 'id' });
DetailUser.hasOne(GeneralInformation, { foreignKey: 'user_id' });
GeneralInformation.hasOne(DetailUser, { foreignKey: 'id' });
GeneralInformation.hasMany(Specialist, { foreignKey: 'general_information_id' });
Specialist.belongsTo(GeneralInformation, { foreignKey: 'id' });

module.exports = {
  User,
  DetailUser,
  GeneralInformation,
  Specialist
};
