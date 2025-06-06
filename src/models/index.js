const UserField = require('./User');
const ServiceField = require('./Service');
const SpecialistField = require('./Specialist');
const DetailServiceField = require('./DetailService');
const PhotoField = require('./Photo');
const BookingField = require('./Booking');
const ReviewField = require('./Review');
const PersonalAccessTokenField = require('./PersonalAccessToken');
const ChatField = require('./Chat');
const MessageField = require('./Message');
const ListServicesField = require('./ListServices');
const { db } = require('../config/database');

const User = db.define('users', UserField,{
    tableName: 'users',
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

const Specialist = db.define('specialists',SpecialistField, {
    tableName: 'specialists',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

const DetailService = db.define('detail_services',DetailServiceField, {
    tableName: 'detail_services',
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

const ListServices = db.define('list_services',ListServicesField, {
    tableName: 'list_services',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

User.hasOne(Service, { foreignKey: 'user_id' });
Service.hasOne(User, { foreignKey: 'id' });
Service.hasMany(Specialist, { foreignKey: 'service_id' });
Specialist.belongsTo(Service, { foreignKey: 'id' });
Service.hasMany(DetailService, { foreignKey: 'service_id' });
DetailService.belongsTo(Service, { foreignKey: 'id' });
Service.hasMany(Photo, { foreignKey: 'service_id' });
Photo.belongsTo(Service, { foreignKey: 'id' });
Service.hasMany(Booking, { foreignKey: 'service_id' });
Booking.belongsTo(Service, { foreignKey: 'service_id' });
Service.hasMany(Review, { foreignKey: 'service_id' });
Review.belongsTo(Service, { foreignKey: 'service_id' });
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(PersonalAccessToken, { foreignKey: 'user_id' });
PersonalAccessToken.belongsTo(User, { foreignKey: 'id' });
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });
ListServices.hasMany(DetailService, { foreignKey: 'list_service_id' });
DetailService.belongsTo(ListServices, { foreignKey: 'list_service_id' });

Chat.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasMany(Chat, { as: 'userChats', foreignKey: 'user_id' });

Chat.belongsTo(User, { as: 'mitra', foreignKey: 'mitra_id' });
User.hasMany(Chat, { as: 'mitraChats', foreignKey: 'mitra_id' });

Message.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'sender_id' });

Message.belongsTo(Chat, { foreignKey: 'chat_id' });
Chat.hasMany(Message, { foreignKey: 'chat_id' });


module.exports = {
  User,
  Service,
  Specialist,
  DetailService,
  Photo,
  Booking,
  Review,
  PersonalAccessToken,
  Chat,
  Message,
  ListServices
};
