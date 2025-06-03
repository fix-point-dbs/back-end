const Joi = require('joi');

const detailServiceSchema = Joi.array().items(
    Joi.object({
      type: Joi.string().required().messages({
        'string.base': 'Jenis detail layanan harus berupa teks',
        'string.empty': 'Jenis detail layanan wajib diisi',
        'any.required': 'Jenis detail layanan wajib diisi',
      }),
      description: Joi.string().required().messages({
        'string.base': 'Deskripsi detail layanan harus berupa teks',
        'string.empty': 'Deskripsi detail layanan wajib diisi',
        'any.required': 'Deskripsi detail layanan wajib diisi',
      }),
    })
  )
//   .messages({
//     'array.base': 'Detail layanan harus berupa array',
//     'array.min': 'Minimal harus ada satu detail layanan',
//     // 'any.required': 'Detail layanan wajib disi',
//   });

const servicePayloadSchema = Joi.object({
  user_id: Joi.number().required().messages({
    'number.base': 'ID pengguna harus berupa angka',
    'any.required': 'ID pengguna wajib diisi'
  }),
  bussiness_name: Joi.string().required().messages({
    'string.empty': 'Nama usaha wajib diisi',
    'any.required': 'Nama usaha wajib diisi'
  }),
  person_responsible: Joi.string().required().messages({
    'string.empty': 'Penanggung jawab wajib diisi',
    'any.required': 'Penanggung jawab wajib diisi'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Deskripsi wajib diisi',
    'any.required': 'Deskripsi wajib diisi'
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Alamat wajib diisi',
    'any.required': 'Alamat wajib diisi'
  }),
  latitude: Joi.string().required().messages({
    'string.empty': 'Latitude wajib diisi',
    'any.required': 'Latitude wajib diisi'
  }),
  longitude: Joi.string().required().messages({
    'string.empty': 'Longitude wajib diisi',
    'any.required': 'Longitude wajib diisi'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Jenis layanan wajib diisi',
    'any.required': 'Jenis layanan wajib diisi'
  }),
  vehicle_type: Joi.string().required().messages({
    'string.empty': 'Jenis kendaraan wajib diisi',
    'any.required': 'Jenis kendaraan wajib diisi'
  }),
  start_price_range: Joi.number().required().messages({
    'number.base': 'Harga awal harus berupa angka',
    'any.required': 'Harga awal wajib diisi'
  }),
  end_price_range: Joi.number().required().messages({
    'number.base': 'Harga akhir harus berupa angka',
    'any.required': 'Harga akhir wajib diisi'
  }),
  year_founded: Joi.number().required().messages({
    'number.base': 'Tahun berdiri harus berupa angka',
    'any.required': 'Tahun berdiri wajib diisi'
  }),
  full_operational: Joi.boolean().required().messages({
    'boolean.base': 'Full operational harus berupa true atau false',
    'any.required': 'Status full operational wajib diisi'
  }),
  opening_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required().messages({
    'string.empty': 'Jam buka wajib diisi',
    'string.pattern.base': 'Format jam buka harus HH:MM:SS',
    'any.required': 'Jam buka wajib diisi'
  }),
  closing_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required().messages({
    'string.empty': 'Jam tutup wajib diisi',
    'string.pattern.base': 'Format jam tutup harus HH:MM:SS',
    'any.required': 'Jam tutup wajib diisi'
  }),
  alternative_phone: Joi.string().required().messages({
    'string.empty': 'Nomor telepon alternatif wajib diisi',
    'any.required': 'Nomor telepon alternatif wajib diisi'
  }),
  list_service_id: Joi.required(),
  specialist_names: Joi.required(),
  photos: Joi.required(),
});



module.exports = { servicePayloadSchema };