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
    const booking = await Booking.create({
        user_id: user_id,
        service_id: data.service_id,
        general_information_id: data.general_information_id,
        vehicle: data.vehicle,
        vehicle_brand: data.vehicle_brand,
        police_number: data.police_number,
        description: data.description
    });
    return "Success";
}

const update = async (booking_id, data) => {
    const booking = await Booking.update({
        user_id: data.user_id,
        service_id: data.service_id,
        general_information_id: data.general_information_id,
        vehicle: data.vehicle,
        vehicle_brand: data.vehicle_brand,
        police_number: data.police_number,
        description: data.description
    }, { where: { id: booking_id } });
    return "Success";
}

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