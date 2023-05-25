const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Every user will have an account for each currency registered
    const users = await queryInterface.sequelize.query(`
      SELECT *
      FROM "User"
    `);

    const currencies = await queryInterface.sequelize.query(`
      SELECT *
      FROM "Currency"
    `);

    const inserts = []
    for ( const user of users[0] ) {
      for ( const currency of currencies[0] ) {
        inserts.push({
          account_id: uuid.v4(),
          balance: 1000,
          user_id: user.user_id,
          currency_id: currency.currency_id
        })
      }
    }

    return queryInterface.bulkInsert('Account', inserts);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Account', null, {});
  },
};
