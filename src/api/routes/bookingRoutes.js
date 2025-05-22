const { 
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
 } = require('../handlers/bookingHandler');
const sanctumAuth = require('../middleware/sanctumAuth');
const { bookingPayloadSchema } = require('../validators/bookingValidator');
module.exports = [
    {
        method: 'GET',
        path: '/bookings',
        handler: getBookings
    },
    {
        method: 'GET',
        path: '/bookings/{id}',
        handler: getBookingById
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
                    return h.response({ status: 'fail', message: err.message }).code(400).takeover();
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
                    return h.response({ status: 'fail', message: err.message }).code(400).takeover();
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