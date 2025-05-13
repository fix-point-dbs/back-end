const { DataTypes } = require('sequelize');

const Chat = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mitra_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    last_message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

module.exports = Chat;