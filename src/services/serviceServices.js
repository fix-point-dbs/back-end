const { Service, Photo, DetailService, Specialist } = require('../models');
const { db } = require('../config/database');
const fs = require('fs');
const path = require('path');

const getAll = async () => {
    const services = await Service.findAll({
        attributes: {
            include: [
                [
                    db.literal(`(
                      SELECT AVG(rating)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
                    'average_rating'
                ],
                [
                    db.literal(`(
                      SELECT COUNT(*)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
                    'review_count'
                ]
            ]
        },
        include: [
            { model: Specialist },
            { model: Photo },
            { model: DetailService }
        ]
    });
    return services;
}

const getById = async (id) => {
    const service = await Service.findOne({
        where: { id },
        attributes: {
            include: [
                [
                    db.literal(`(
                      SELECT AVG(rating)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
                    'average_rating'
                ],
                [
                    db.literal(`(
                      SELECT COUNT(*)
                      FROM reviews
                      WHERE reviews.service_id = services.id
                    )`),
                    'review_count'
                ]
            ]
        },
        include: [
            { model: Specialist },
            { model: Photo },
            { model: DetailService }
        ]
    });
    return service;
}

const create = async (user_id ,data) => {
    const { detail_service_types, detail_service_descriptions, specialist_names, specialist_descriptions, photos } = data;
    const service = await Service.create({
        user_id: user_id,
        bussiness_name: data.bussiness_name,
        person_responsible: data.person_responsible,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        type: data.type,
        vehicle_type: data.vehicle_type,
        start_price_range: data.start_price_range,
        end_price_range: data.end_price_range,
        year_founded: data.year_founded,
        full_operational: data.full_operational,
        opening_time: data.opening_time,
        closing_time: data.closing_time,
        alternative_phone: data.alternative_phone
    });

    
    for(i = 0; i < detail_service_types.length; i++){
        await DetailService.create({
            service_id: service.id,
            type: detail_service_types[i],
            description: detail_service_descriptions[i]
        })
    }

    for(i = 0; i < specialist_names.length; i++){
        await Specialist.create({
            service_id: service.id,
            name: specialist_names[i],
            description: specialist_descriptions[i]
        })
    }

    const uploadDir = path.join(__dirname, '../uploads/photo-services');

    // Pastikan folder ada
    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (let i = 0; i < photos.length; i++) {
    const photo = photos[i]; // ambil file stream
    const ext = path.extname(photo.hapi.filename); // ambil ekstensi file
    const filename = `${Date.now()}-${i}${ext}`; // hindari nama kembar dalam satu loop
    const filepath = path.join(uploadDir, filename);

    const fileStream = fs.createWriteStream(filepath);

    await new Promise((resolve, reject) => {
        photo.pipe(fileStream);
        photo.on('end', resolve);
        photo.on('error', reject);
    });

    // Simpan ke database
    await Photo.create({
        service_id: service.id,
        url_photo: filename, // atau bisa juga simpan relative path jika ingin diakses publik
    });
    }

    return "berhasil";
}

const update = async (service_id, data) => {
    const { detail_service_types, detail_service_descriptions, specialist_names, specialist_descriptions, photos } = data;
    await Service.update({
        bussiness_name: data.bussiness_name,
        person_responsible: data.person_responsible,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        type: data.type,
        vehicle_type: data.vehicle_type,
        start_price_range: data.start_price_range,
        end_price_range: data.end_price_range,
        year_founded: data.year_founded,
        full_operational: data.full_operational,
        opening_time: data.opening_time,
        closing_time: data.closing_time,
        alternative_phone: data.alternative_phone
    }, { where: { id: service_id } });

    return "berhasil";
}

const deleted = async (service_id) => {
    await DetailService.destroy({ where: { service_id: service_id } });
    await Specialist.destroy({ where: { service_id: service_id } });
    await Photo.destroy({ where: { service_id: service_id } });
    await Service.destroy({ where: { id: service_id } });
    return "berhasil";
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
}