const { 
    getAll,
    getById,
    create,
    update,
    destroy
 } = require('../../services/bookingServices');
const { success, error } = require('../../utils/ApiResponser');
const {getUser} = require('../../utils/VerificationToken');
const getBookings = async (request, h) => {
    try {
        const response = await getAll();
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const getBookingById = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await getById(id);
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const createBooking = async (request, h) => {
    try {
        const user_id = await getUser(request);
        const response = await create(user_id, request.payload);
        return h.response(success(response, 'Data berhasil ditambahkan', 201)).code(201);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const updateBooking = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await update(id, request.payload);
        return h.response(success(response, 'Data berhasil di update', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const deleteBooking = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await destroy(id);
        return h.response(success(response, 'Data berhasil di hapus', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}