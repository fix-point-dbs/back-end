const { 
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
 } = require('../handlers/bookingHandler');
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
        handler: createBooking
    },
    {
        method: 'PUT',
        path: '/bookings/{id}',
        handler: updateBooking
    },
    {
        method: 'DELETE',
        path: '/bookings/{id}',
        handler: deleteBooking
    }
];