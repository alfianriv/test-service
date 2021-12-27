'use strict';

const Joi = require('joi');
const db = require('../../models');

module.exports = async (req, res) => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
  });
  try {
    const payload = await schema.validate(req.params);
    if (payload.error) {
      throw new Error(payload.error);
    }
    const manager = await db.Manager.findOne({ id: payload.value.id });
    await db.Manager.destroy({ where: { id: payload.value.id } });
    return res.json({ body: manager });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}