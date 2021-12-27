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
    const store = await db.Store.findOne({ id: payload.value.id });
    await db.Store.destroy({ where: { id: payload.value.id } });
    return res.json({ body: store });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}