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
        manager.name = capitalizeStrings(manager.name);
      },
      beforeUpdate: (manager, options) => {
        manager.name = capitalizeStrings(manager.name);
      }
    },
    schema: 'public',
    tableName: 'manager',
    paranoid: true
  });

  Manager.associate = function (models) {
    Manager.hasMany(models.Store, {
      foreignKey: 'managerId',
      constraints: false,
    });
  }

  return Manager;
}

const capitalizeStrings = (str) => {
  const words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}