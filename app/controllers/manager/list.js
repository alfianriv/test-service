'use strict';

const db = require('../../models');

module.exports = async (req, res) => {
  try {
    const managers = await db.Manager.findAll({ includes: [{ model: db.Store, as: 'stores' }] });
    return res.json({ body: managers });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}