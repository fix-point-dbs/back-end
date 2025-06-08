const { statistics, getMonthlyBookingStats } = require('../handlers/statisticsHandler');
const sanctumAuth = require('../middleware/sanctumAuth');
module.exports = [
    {
        method: 'GET',
        path: '/statistics',
        handler: statistics,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    },
    {
        method: 'GET',
        path: '/statistics/monthly-bookings',
        handler: getMonthlyBookingStats,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    }
]