module.exports = function(sequelize, DataTypes) {
  const Account = sequelize.define(
    'Account',
    {      
      accountId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'account_id',
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
    },
    {
      freezeTableName: true,
      paranoid: false,
      underscored: true
    }
  );

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: 'userId',
        field: 'user_id',
      },
      as: 'user',
    });
    Account.belongsTo(models.Currency, {
      foreignKey: {
        allowNull: false,
        name: 'currencyId',
        field: 'currency_id',
      },
      as: 'currency',
    });
  }

  return Account;
};