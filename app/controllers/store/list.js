'use strict';

const Store = require('../../models/store');

module.exports = async (req, res) => {
  try {
    const stores = await Store.findAll();
    return res.json(stores);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}