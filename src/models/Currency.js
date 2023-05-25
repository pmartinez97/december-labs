module.exports = function(sequelize, DataTypes) {
  const Currency = sequelize.define(
    'Currency',
    {
      currencyId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'currency_id',
      },
      currencyName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'currency_name',
      },
      currencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'currency_code',
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

  return Currency;
};