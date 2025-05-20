const { 
    getAll,
    getById,
    create,
    update,
    destroy
 } = require('../../services/bookingServices');
const { success } = require('../../utils/ApiResponser');
const getBookings = async (request, h) => {
    try {
        const response = await getAll();
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'+error
        }).code(500);
    }
}

const getBookingById = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await getById(id);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
}

const createBooking = async (request, h) => {
    try {
        const user_id = 1;
        const response = await create(user_id, request.payload);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error '+error
        }).code(500);
    }
}

const updateBooking = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await update(id, request.payload);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error '+error
        }).code(500);
    }
}

const deleteBooking = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await destroy(id);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}