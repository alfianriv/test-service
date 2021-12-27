'use strict';

module.exports = function (sequelize, DataTypes) {
  const Store = sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    schema: 'public',
    tableName: 'store',
    paranoid: true
  });

  Store.associate = function (models) {
    Store.belongsTo(models.Manager, {
      foreignKey: 'managerId',
      constraints: false,
    });
  }

  return Store;
}