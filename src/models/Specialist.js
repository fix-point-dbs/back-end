const { DataTypes } = require('sequelize');

const Specialist = {
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

module.exports = Specialist;