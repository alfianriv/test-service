'use strict';

const max_core = process.env.MAX_CORE || null;
const forky = require('forky');

let param = { path: __dirname + '/server,js' };
if (max_core) Object.assign(param, { worker: max_core });
forky(param);