const { getAll, getById, create, update, destroy } = require('../../services/reviewServices');
const { success } = require('../../utils/ApiResponser');

const getAllReviews = async (req, h) => {
    try {
        const response = await getAll();
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error '+error
        }).code(500);
    }
}

const getReviewById = async (req, h) => {
    try {
        const { id } = req.params;
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

const createReview = async (req, h) => {
    try {
        const response = await create(req.payload);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error '+error
        }).code(500);
    }
}

const updateReview = async (req, h) => {
    try {
        const { id } = req.params;
        const response = await update(id, req.payload);
        return h.response(success(response, 'success', 200)).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Internal Server Error '+error
        }).code(500);
    }
}

const deleteReview = async (req, h) => {
    try {
        const { id } = req.params;
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
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}