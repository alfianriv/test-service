const db = require('../app/models');

async function truncateTables() {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.sequelize.query('TRUNCATE TABLE `stores`');
  await db.sequelize.query('TRUNCATE TABLE `managers`');
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}

module.exports = {
  truncateTables
}