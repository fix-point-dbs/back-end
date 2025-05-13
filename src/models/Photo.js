const {  DataTypes } = require('sequelize');

const Photo = {
    url_photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    general_information_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = Photo;