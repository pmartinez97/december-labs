"use strict";
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Account", {
      account_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      balance: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
      },
      currency_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Currency',
          key: 'currency_id',
        },
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

  down: (queryInterface) => queryInterface.dropTable("Account"),
};