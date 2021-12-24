'use strict';

const router = require('express').Router();

router.get('/', require('./list'));
router.get('/manager/:id', require('./list-by-manager'));
router.get('/:id', require('./detail'));
router.post('/', require('./create'));
router.put('/:id', require('./update'));
router.delete('/:id', require('./delete'));

module.exports = router;