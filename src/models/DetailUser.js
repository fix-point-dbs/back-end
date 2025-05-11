const { DataTypes } = require('sequelize');

const DetailUser = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'users', // nama tabel SQL (bukan nama model JS)
    //   key: 'id'
    // },
    // onUpdate: 'CASCADE',
    // onDelete: 'CASCADE'
  }
};

module.exports = DetailUser;
