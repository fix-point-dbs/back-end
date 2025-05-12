const { DataTypes } = require('sequelize');

const DetailUser = {
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  alternative_phone: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
};

module.exports = DetailUser;
