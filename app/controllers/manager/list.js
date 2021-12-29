'use strict';

const db = require('../../models');

module.exports = async (req, res) => {
  try {
    const managers = await db.Manager.findAll({ order: [['id', 'ASC']] });
    return res.json({ body: managers });
  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
}