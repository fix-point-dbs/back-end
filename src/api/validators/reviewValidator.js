const Joi = require('joi');
const reviewPayloadSchema = Joi.object({
    user_id: Joi.number().required().messages({
        'number.base': 'ID pengguna harus berupa angka',
        'any.required': 'ID pengguna wajib diisi'
    }),
    service_id: Joi.number().required().messages({
        'number.base': 'ID layanan harus berupa angka',
        'any.required': 'ID layanan wajib diisi'
    }),
    rating: Joi.number().required().messages({
        'number.base': 'Rating harus berupa angka',
        'any.required': 'Rating wajib diisi'
    }),
    review: Joi.string().required().messages({
        'string.empty': 'Review wajib diisi',
        'any.required': 'Review wajib diisi'
    }),
})

module.exports = {
    reviewPayloadSchema
}