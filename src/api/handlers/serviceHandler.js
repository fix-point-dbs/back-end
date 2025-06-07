const { success, error } = require('../../utils/ApiResponser');
const { getAll, getById, create, update, destroy, updatedStatus } = require('../../services/serviceServices');
const getServices = async (request, h) => {
    try {
        const response = await getAll(request);
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err.message, 500)).code(500);
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
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
};

const createService = async (request, h) => {
    try {
        const user_id = 1;
        const response = await create(user_id, request.payload);
        return h.response(success(response, 'Data berhasil dibuat', 201)).code(201);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
};

const updateService = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await update(id, request.payload);
        return h.response(success(response, 'Data berhasil diupdate', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
};

const deleteService = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await destroy(id);
        return h.response(success(response, 'Data berhasil dihapus', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
};

const updateStatus = async (request, h) => {
    try {
        const { id } = request.params;
        const response = await updatedStatus(id, request.payload);
        return h.response(success(response, 'Data berhasil diupdate', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    updateStatus,
};