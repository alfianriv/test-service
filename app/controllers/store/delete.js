'use strict';

const Store = require('../../models/store');

module.exports = async (req, res) => {
  try {
    const store = await Store.destroy(req.params.id);
    return res.json(store);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}