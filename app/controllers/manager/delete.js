'use strict';

const Manager = require('../../models/manager');

module.exports = async (req, res) => {
  try {
    const manager = await Manager.destory({ where: { id: req.params.id } });
    return res.json({ body: manager });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
}