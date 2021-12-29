'use strict';

const Joi = require('joi');
const db = require('../../models');

module.exports = async (req, res) => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    managerId: Joi.number().integer(),
  });
  try {
    const payload = schema.validate({ ...req.body, id: req.params.id });
    if (payload.error) {
      throw new Error(payload.error);
    }
    let store = await db.Store.findOne({ where: { id: payload.value.id } });
    await store.update(payload.value);
    store = await db.Store.findOne({ where: { id: payload.value.id } });
    return res.json({ body: store });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}