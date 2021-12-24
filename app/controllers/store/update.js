'use strict';

const Store = require('../../models/store');

module.exports = async (req, res) => {
  try {
    const store = await Store.findOne(req.params.id);
    const result = await store.update(req.body);
    return res.json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });throw new Error(error);
  }
}