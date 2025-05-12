const { type } = require('@hapi/joi/lib/extend');
const {DataTypes} = require('sequelize');

const GeneralInformation = {
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
    lattitude: {
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
    type_vehicle: {
        type: DataTypes.ENUM('car', 'motorcycle','truck'),
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
    }

};

module.exports = GeneralInformation;