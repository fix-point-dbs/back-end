const { Sequelize } = require('sequelize');

const db = new Sequelize('fix_point', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00',
  logging: false,
});

module.exports = { db };