'use strict';

const { NODE_ENV = 'development', SEQUELIZE_MAX_POOL, AUDIT_TRAIL } = process.env;
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const Sequelize = require('sequelize');
const { extend } = require('lodash');
const config = require('../../config/config.json')[NODE_ENV];

let db = {};
let dbReplication = {};

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};


Object.assign(config, { operatorsAliases });
if (NODE_ENV !== 'test') {
  config.logging = function sequelizeLog(queryString) {
    const [sql] = queryString.split(';');
    return console.log(`${sql};`);
  };
}

const sequelize = new Sequelize(config);

fs.readdirSync(__dirname).forEach(file => {
  if (file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file != 'index.js') {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
});

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = extend({
  sequelize,
  Sequelize
}, db);