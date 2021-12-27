'use strict';

const db = require('../../models');
const Joi = require('joi');

module.exports = async (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    const payload = schema.validate(req.body);
    if(payload.error){
      throw new Error(payload.error);
    }
    const manager = await db.Manager.create(payload.value);
    return res.json({ body: manager });
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}