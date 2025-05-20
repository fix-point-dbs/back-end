const { Review } = require('../models');
const getAll = async () => {
    const reviews = await Review.findAll();
    return reviews;
}

const getById = async (id) => {
    const review = await Review.findOne({ where: { id } });
    return review;
}

const create = async (data) => {
    const review = await Review.create({
        service_id: data.service_id,
        user_id: data.user_id,
        rating: data.rating,
        review: data.review
    });
    return review;
}

const update = async (id, data) => {
    const review = await Review.findOne({ where: { id } });
    if (!review) {
        throw new Error('Data review tidak ditemukan');
    }
    await Review.update(data, { where: { id } });
    return "berhasil";
}

const destroy = async (id) => {
    const review = await Review.findOne({ where: { id } });
    if (!review) {
        throw new Error('Data review tidak ditemukan');
    }
    await Review.destroy({ where: { id } });
    return "berhasil";
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy
}