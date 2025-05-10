const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fix_point', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = { sequelize };