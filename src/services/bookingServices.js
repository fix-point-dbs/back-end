const fs = require('fs');
const path = require('path');
const { Booking, Service, User } = require('../models');
const getAll = async () => {
    const bookings = await Booking.findAll({
        include: [
            { model: Service },
            { model: User }
        ]});
    return bookings;
}

const getById = async (id) => {
    const booking = await Booking.findByPk(id, {
        include: [
            { model: Service },
            { model: User }
    ]});
    return booking;
}

const create = async (user_id ,data) => {
    const uploadDir = path.join(__dirname, '../uploads/photo-booking');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    let imagePath = null;

    if (data.photo && data.photo.hapi) {
      const filename = `${Date.now()}-${data.photo.hapi.filename}`;
      const filepath = path.join(uploadDir, filename);
      const fileStream = fs.createWriteStream(filepath);
  
      await new Promise((resolve, reject) => {
        data.photo.pipe(fileStream);
        data.photo.on('end', resolve);
        data.photo.on('error', reject);
      });
  
      imagePath = `/uploads/${filename}`;
    }
  
    const booking = await Booking.create({
        user_id: user_id,
        service_id: data.service_id,
        general_information_id: data.general_information_id,
        vehicle: data.vehicle,
        vehicle_brand: data.vehicle_brand,
        police_number: data.police_number,
        description: data.description,
        status: data.status,
        latitude: data.latitude,
        longitude: data.longitude,
        photo: imagePath
    });
    return "Success";
}

const update = async (bookingId, data) => {
  const uploadDir = path.join(__dirname, '../uploads/photo-booking');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const booking = await Booking.findOne({ where: { id: bookingId} });
  if (!booking) {
    throw new Error('Data booking tidak ditemukan');
  }

  let imagePath = booking.photo;


  if (data.photo && data.photo.hapi) {
    const oldPath = path.join(__dirname, '..', booking.photo);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    const filename = `${Date.now()}-${data.photo.hapi.filename}`;
    const filepath = path.join(uploadDir, filename);
    const fileStream = fs.createWriteStream(filepath);

    await new Promise((resolve, reject) => {
      data.photo.pipe(fileStream);
      data.photo.on('end', resolve);
      data.photo.on('error', reject);
    });

    imagePath = `/uploads/photo-booking/${filename}`;
  }

  await booking.update({
    service_id: data.service_id,
    general_information_id: data.general_information_id,
    vehicle: data.vehicle,
    vehicle_brand: data.vehicle_brand,
    police_number: data.police_number,
    description: data.description,
    status: data.status,
    latitude: data.latitude,
    longitude: data.longitude,
    photo: imagePath
  });

  return 'Success';
};

module.exports = { update };


const deleted = async (booking_id) => {
    const booking = await Booking.destroy({ where: { id: booking_id } });
    return "Success";
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
}