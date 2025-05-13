const UserField = require('./User');
const DetailUserField = require('./DetailUser');
const GeneralInformationField = require('./GeneralInformation');
const SpecialistField = require('./Specialist');
const ServiceField = require('./Service');
const PhotoField = require('./Photo');
const BookingField = require('./Booking');
const ReviewField = require('./Review');
const PersonalAccessTokenField = require('./PersonalAccessToken');
const ChatField = require('./Chat');
const MessageField = require('./Message');
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

const Service = db.define('services',ServiceField, {
    tableName: 'services',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const Photo = db.define('photos',PhotoField, {
    tableName: 'photos',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const Booking = db.define('bookings',BookingField, {
    tableName: 'bookings',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const Review = db.define('reviews',ReviewField, {
    tableName: 'reviews',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const PersonalAccessToken = db.define('personal_access_tokens',PersonalAccessTokenField, {
    tableName: 'personal_access_tokens',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const Chat = db.define('chats',ChatField, {
    tableName: 'chats',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const Message = db.define('messages',MessageField, {
    tableName: 'messages',
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
GeneralInformation.hasMany(Service, { foreignKey: 'general_information_id' });
Service.belongsTo(GeneralInformation, { foreignKey: 'id' });
GeneralInformation.hasMany(Photo, { foreignKey: 'general_information_id' });
Photo.belongsTo(GeneralInformation, { foreignKey: 'id' });
GeneralInformation.hasMany(Booking, { foreignKey: 'general_information_id' });
Booking.belongsTo(GeneralInformation, { foreignKey: 'id' });
GeneralInformation.hasMany(Review, { foreignKey: 'general_information_id' });
Review.belongsTo(GeneralInformation, { foreignKey: 'id' });
User.hasMany(PersonalAccessToken, { foreignKey: 'user_id' });
PersonalAccessToken.belongsTo(User, { foreignKey: 'id' });
// User.hasMany(Chat, { foreignKey: 'user_id' });
// Chat.belongsTo(User, { foreignKey: 'id' });
// Chat.hasMany(Message, { foreignKey: 'chat_id' });
// Message.belongsTo(Chat, { foreignKey: 'id' });
User.associate = (models) => {
    User.hasMany(models.Chat, { foreignKey: 'mitra_id', as: 'mitraChats' });
    User.hasMany(models.Chat, { foreignKey: 'user_id', as: 'userChats' });

    User.hasMany(models.Message, { foreignKey: 'sender_id', as: 'sentMessages' });
  };

  Chat.associate = (models) => {
    Chat.belongsTo(models.User, { foreignKey: 'mitra_id', as: 'mitra' });
    Chat.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    Chat.hasMany(models.Message, { foreignKey: 'chat_id', as: 'messages' });
  };

module.exports = {
  User,
  DetailUser,
  GeneralInformation,
  Specialist,
  Service,
  Photo,
  Booking,
  Review,
  PersonalAccessToken,
  Chat,
  Message
};
