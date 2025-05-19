const { DataTypes } = require('sequelize');
const { lattitude } = require('./Service');

const Booking = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    police_number : {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false
    },
    lattitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

module.exports = Booking;