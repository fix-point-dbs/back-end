const {  DataTypes } = require('sequelize');

const Photo = {
    url_photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = Photo;