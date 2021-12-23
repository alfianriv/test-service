'use strict';

const { NODE_ENV: ENV = 'development' } = process.env;

const path = require('path');
global.__base = path.join(__dirname, '/');
const envoodoo = require('envoodoo');
const envFile = path.join(__dirname, ENV + '.env');


envoodoo(envFile, async function (e) {
  if (e) throw e;

  const {
    PORT
  } = process.env;

  const express = require('express');
  const app = express();

  require('./config/express')(app);

  const port = PORT || 3001;

  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  })
})