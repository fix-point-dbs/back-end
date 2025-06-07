const { statistics, getMonthlyBookingStats } = require('../handlers/statisticsHandler');
module.exports = [
    {
        method: 'GET',
        path: '/statistics',
        handler: statistics
    },
    {
        method: 'GET',
        path: '/statistics/monthly-bookings',
        handler: getMonthlyBookingStats
    }
]