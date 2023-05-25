"use strict";
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Currency", {
      currency_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4()
      },
      currency_name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 1,
      },
      currency_code: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("Currency"),
};