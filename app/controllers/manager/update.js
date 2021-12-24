'use strict';

const Manager = require('../../models/manager');

module.exports = async (req, res) => {
  try {
    const manager = await Manager.findOne(req.params.id);
    const result = manager.update(req.body);
    return res.json({ body: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}