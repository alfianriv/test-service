'use strict';

const db = require('../../models');

module.exports = async (req, res) => {
  try {
    const stores = await db.Store.findAll();
    return res.json({ body: stores });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}