const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
        user_id: uuid.v4(),
        user_name: 'John Doe',
      },
      {
        user_id: uuid.v4(),
        user_name: 'Bruce Wayne',
      },
      {
        user_id: uuid.v4(),
        user_name: 'Carl Sagan',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  },
};