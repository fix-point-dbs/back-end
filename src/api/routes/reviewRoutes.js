const { 
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
 } = require('../handlers/reviewHandler');
const { reviewPayloadSchema } = require('../validators/reviewValidator');
const sanctumAuth = require('../middleware/sanctumAuth');
const { error } = require('../../utils/ApiResponser');
module.exports = [
    {
        method: 'GET',
        path: '/reviews',
        handler: getAllReviews,
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
            pre: [
                sanctumAuth
            ],
            validate: {
                payload: reviewPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response(error({}, err.message ,400)).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/reviews/{id}',
        handler: updateReview,
        options: {
            pre: [
                sanctumAuth
            ],
            validate: {
                payload: reviewPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response(error({}, err.message ,400)).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/reviews/{id}',
        handler: deleteReview,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    }
]