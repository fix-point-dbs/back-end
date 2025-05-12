const { DataTypes } = require('sequelize');

const Specialist = {
    general_information_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('come workshop', 'visit', 'both'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

module.exports = Specialist;