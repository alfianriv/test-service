'use strict';

module.exports = function (sequelize, DataTypes) {
  const Manager = sequelize.define('Manager', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCreate: (manager, options) => {
        manager.name = manager.name.toUpperCase();
      },
      beforeUpdate: (manager, options) => {
        manager.name = manager.name.toUpperCase();
      }
    },
    schema: 'public',
    tableName: 'manager',
    paranoid: true
  });

  Manager.associate = function (models) {
    Manager.hasMany(models.Store, {
      constraints: false,
    });
  }

  return Manager;
}