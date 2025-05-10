const Joi = require('@hapi/joi');

const userPayloadSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required()
});

module.exports = { userPayloadSchema };
