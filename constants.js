const Sequelize = require('sequelize');

// Connecting to local database
const DBConfig = new Sequelize('zammit', 'postgres', "kl;'\\", {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = DBConfig;
