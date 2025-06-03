const {DataTypes} = require('sequelize');

const DetailService = {
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    list_service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = DetailService;