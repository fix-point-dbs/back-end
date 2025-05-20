const { 
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
 } = require('../handlers/reviewHandler');
const { reviewPayloadSchema } = require('../validators/reviewValidator');
module.exports = [
    {
        method: 'GET',
        path: '/reviews',
        handler: getAllReviews
    },
    {
        method: 'GET',
        path: '/reviews/{id}',
        handler: getReviewById
    },
    {
        method: 'POST',
        path: '/reviews',
        handler: createReview,
        options: {
            validate: {
                payload: reviewPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response({ status: 'fail', message: err.message }).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/reviews/{id}',
        handler: updateReview
    },
    {
        method: 'DELETE',
        path: '/reviews/{id}',
        handler: deleteReview
    }
]