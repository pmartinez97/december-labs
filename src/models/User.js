module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {      
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'user_id',
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'user_name',
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

  User.associate = function(models) {
    User.hasMany(models.Account, {
      as: 'accounts',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  }

  return User;
};