const { statistics } = require('../handlers/statisticsHandler');
module.exports = [
    {
        method: 'GET',
        path: '/statistics',
        handler: statistics
    }
]