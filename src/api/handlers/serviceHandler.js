const { success } = require('../../utils/ApiResponser');
const { getAll, getById, getAllByType, create, update, deleted } = require('../../services/serviceServices');
const getServices = async (request, h) => {
    try {
        const response = await getAll();
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
};

const getServiceById = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await getById(id);
        if (!response) {
            return h.response({
                status: 'error',
                message: 'Service not found'
            }).code(404);
        }
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
};

const getServicesByType = async (request, h) => {
    try {
        const { type } = request.params;
        const response = await getAllByType(type);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
};

const createService = async (request, h) => {
    try {
        const user_id = 1;
        const response = await create(user_id, request.payload);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
};

const updateService = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await update(id, request.payload);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
};

const deleteService = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await deleted(id);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error'
        }).code(500);
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    getServicesByType
};