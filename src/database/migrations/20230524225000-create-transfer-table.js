"use strict";
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Transfer", {
      transfer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      from_account_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Account',
          key: 'account_id',
        },
      },
      to_account_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Account',
          key: 'account_id',
        },
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      description: {        
        type: Sequelize.STRING,
        allowNull: true,
      },
      transfer_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
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

  down: (queryInterface) => queryInterface.dropTable("Transfer"),
};