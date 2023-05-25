module.exports = function(sequelize, DataTypes) {
  const Transfer = sequelize.define(
    'Transfer',
    {      
      transferId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'transfer_id',
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transferDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'transfer_date'
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

  Transfer.associate = function(models) {
    Transfer.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false,
        name: 'fromAccountId',
        field: 'from_account_id',
      },
      as: 'from',
    });
    Transfer.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false,
        name: 'toAccountId',
        field: 'to_account_id',
      },
      as: 'to',
    });
  }

  return Transfer;
};