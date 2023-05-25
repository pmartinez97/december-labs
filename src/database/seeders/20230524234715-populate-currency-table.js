const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Currency', [
      {
        currency_id: uuid.v4(),
        currency_name: 'Uruguayan Peso',
        currency_code: 'UYU'
      },
      {
        currency_id: uuid.v4(),
        currency_name: 'United States Dollar',
        currency_code: 'USD'
      },
      {
        currency_id: uuid.v4(),
        currency_name: 'Euro',
        currency_code: 'EUR'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Currency', null, {});
  },
};