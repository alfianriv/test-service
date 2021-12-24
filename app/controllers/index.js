'use strict';

module.exports = (app) => {
  app.use('/test', require('./test'));
  app.use('/manager', require('./manager'));
  app.use('/store', require('./store'));
}