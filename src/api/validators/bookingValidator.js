const Joi = require('joi');

const bookingPayloadSchema = Joi.object({
    user_id: Joi.number().required().messages({
        'number.base': 'ID pengguna harus berupa angka',
        'any.required': 'ID pengguna wajib diisi'
    }),
    service_id: Joi.number().required().messages({
        'number.base': 'ID layanan harus berupa angka',
        'any.required': 'ID layanan wajib diisi'
    }),
    vehicle: Joi.string().required().messages({
        'any.required': 'Tanggal awal wajib diisi'
    }),
    vehicle_brand: Joi.string().required().messages({
        'any.required': 'Tanggal akhir wajib diisi'
    }),
    police_number: Joi.string().required().messages({
        'any.required': 'Harga wajib diisi'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Harga wajib diisi'
    }),
    status: Joi.string().required().messages({
        'string.empty': 'Status wajib diisi',
        'any.required': 'Status wajib diisi'
    }),
    latitude: Joi.string().required().messages({
        'string.empty': 'Latitude wajib diisi',
        'any.required': 'Latitude wajib diisi'
    }),
    longitude: Joi.string().required().messages({
        'string.empty': 'Longitude wajib diisi',
        'any.required': 'Longitude wajib diisi'
    }),
    photo: Joi.required().messages({
        'any.required': 'Foto wajib diisi'
    }),
});

module.exports = { bookingPayloadSchema };