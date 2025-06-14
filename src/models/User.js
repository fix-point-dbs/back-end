const { DataTypes } = require('sequelize');

const User ={
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    // unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'mitra'),
    allowNull: false
  },
    phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
}

module.exports = User;
