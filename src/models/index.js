'use strict';

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const basename = path.basename(module.filename)

const sequelize = require('../services/sequelize.service')
require("dotenv").config()

let db = {}
let sequelizeInstance = new Sequelize(databaseConfig);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelizeInstance, Sequelize.DataTypes)
    db[model.name] = model
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }

  // if ( process.env.NODE_ENV == 'development' ) {
  //   db[modelName].sync({ alter: true })
  // }
});

db.sequelize = sequelizeInstance
db.Sequelize = Sequelize

module.exports = db