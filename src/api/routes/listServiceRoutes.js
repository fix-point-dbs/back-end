const { getListServices } = require('../handlers/listServiceHandler') ;
module.exports = [
    {
        method: 'GET',
        path: '/list-services',
        handler: getListServices
    }
]