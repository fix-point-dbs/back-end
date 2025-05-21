const {  DataTypes } = require('sequelize');

const PersonalAccessToken = {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
}

module.exports = PersonalAccessToken;