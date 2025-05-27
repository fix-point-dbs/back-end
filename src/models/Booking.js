const { DataTypes } = require('sequelize');

const Booking = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detail_service_name: {
        type: DataTypes.STRING,
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
        type: DataTypes.ENUM('pending', 'in progress', 'approved', 'rejected','done'),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
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