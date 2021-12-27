'use strict';

const Joi = require('joi');
const db = require('../../models');

module.exports = async (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    managerId: Joi.number().integer().required(),
  });
  try {
    const payload = await schema.validate(req.body);
    if (payload.error) {
      throw new Error(payload.error);
    }
    const store = await db.Store.create(payload.value);
    return res.json({ body: store });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}