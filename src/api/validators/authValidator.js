const Joi = require('joi');

const registerPayloadSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required().messages({
        'phone.required': 'Phone harus wajib di isi'
    })
});

const loginPayloadSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = { registerPayloadSchema, loginPayloadSchema };