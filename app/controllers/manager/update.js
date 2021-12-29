'use strict';

const Joi = require('joi');
const db = require('../../models');

module.exports = async (req, res) => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
  });

  try {
    const payload = schema.validate({
      id: req.params.id,
      name: req.body.name,
    });
    if (payload.error) {
      throw new Error(payload.error);
    }
    let manager = await db.Manager.findOne({ where: { id: payload.value.id } });
    await manager.update(payload.value);
    manager = await db.Manager.findOne({ where: { id: payload.value.id } });
    return res.json({ body: manager });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}