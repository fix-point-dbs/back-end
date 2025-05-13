const { DataTypes } = require('sequelize');

const Review = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    general_information_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

module.exports = Review;