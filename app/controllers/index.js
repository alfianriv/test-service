'use strict';

module.exports = (app) => {
  app.use('/test', require('./test'));
}