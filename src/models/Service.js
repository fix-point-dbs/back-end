const {DataTypes} = require('sequelize');

const Service = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bussiness_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    person_responsible: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
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
    type: {
        type: DataTypes.ENUM('workshop', 'towing'),
        allowNull: false
    },
    vehicle_type: {
        type: DataTypes.ENUM('car', 'motorcycle','truck'),
        allowNull: false
    },
    start_price_range: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    end_price_range: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year_founded: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_operational: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    opening_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    closing_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    alternative_phone: {
        type: DataTypes.STRING
    },
};

module.exports = Service;