const { getAll, getById, create, update, destroy } = require('../../services/reviewServices');
const { success, error } = require('../../utils/ApiResponser');

const getAllReviews = async (req, h) => {
    try {
        const response = await getAll();
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const getReviewById = async (req, h) => {
    try {
        const { id } = req.params;
        const response = await getById(id);
        return h.response(success(response, 'Data berhasil diambil', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const createReview = async (req, h) => {
    try {
        const response = await create(req.payload);
        return h.response(success(response, 'Data berhasil ditambahkan', 201)).code(201);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const updateReview = async (req, h) => {
    try {
        const { id } = req.params;
        const response = await update(id, req.payload);
        return h.response(success(response, 'Data berhasil di update', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

const deleteReview = async (req, h) => {
    try {
        const { id } = req.params;
        const response = await destroy(id);
        return h.response(success(response, 'Data berhasil dihapus', 200)).code(200);
    } catch (err) {
        return h.response(error({}, err, 500)).code(500);
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}