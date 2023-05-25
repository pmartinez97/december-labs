const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')

function init() {
  return new Sequelize(databaseConfig);
}

module.exports = {
  init
};