const { reverseGeocode } = require('../handlers/mapHandler');
module.exports = [
    {
        method: 'GET',
        path: '/reverse-geocode',
        handler: reverseGeocode
    }
]