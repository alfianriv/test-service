'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  return res.json('Service is running');
});

module.exports = router;