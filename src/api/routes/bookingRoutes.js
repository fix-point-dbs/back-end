const { 
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
 } = require('../handlers/bookingHandler');
const sanctumAuth = require('../middleware/sanctumAuth');
const { bookingPayloadSchema } = require('../validators/bookingValidator');
const { error } = require('../../utils/ApiResponser');
module.exports = [
    {
        method: 'GET',
        path: '/bookings',
        handler: getBookings,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    },
    {
        method: 'GET',
        path: '/bookings/{id}',
        handler: getBookingById,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    },
    {
        method: 'POST',
        path: '/bookings',
        handler: createBooking,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            },
            pre: [
                sanctumAuth
            ],
            validate: {
                payload: bookingPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response(error({}, err.message, 400) ).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/bookings/{id}',
        handler: updateBooking,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            },
            pre: [
                sanctumAuth
            ],
            validate: {
                payload: bookingPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response(error({}, err, 400)).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/bookings/{id}',
        handler: deleteBooking,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    }
];