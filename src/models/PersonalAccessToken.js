const {  DataTypes } = require('sequelize');

const PersonalAccessToken = {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = PersonalAccessToken;