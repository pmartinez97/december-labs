"use strict";
const uuid = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("User", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid.v4(),
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable("User"),
};