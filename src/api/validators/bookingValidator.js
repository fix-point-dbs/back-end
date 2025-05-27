const Joi = require('joi');

const bookingPayloadSchema = Joi.object({
    service_id: Joi.number().required().messages({
        'number.base': 'ID layanan harus berupa angka',
        'any.required': 'ID layanan wajib diisi'
    }),
    vehicle: Joi.string().required().messages({
        'any.required': 'Tanggal awal wajib diisi'
    }),
    detail_service_name: Joi.string().required().messages({
        'any.required': 'detail service wajib diisi'
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
    address: Joi.string().required().messages({
        'string.empty': 'Alamat wajib diisi',
        'any.required': 'Alamat wajib diisi'
    }),
    postal_code: Joi.string().required().messages({
        'string.empty': 'Kode pos wajib diisi',
        'any.required': 'Kode pos wajib diisi'
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