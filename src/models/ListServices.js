const {DataTypes} = require('sequelize');

const ListServices = {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

module.exports = ListServices;