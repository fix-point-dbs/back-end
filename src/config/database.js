const { Sequelize } = require('sequelize');

const db = new Sequelize('fix_point', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = { db };