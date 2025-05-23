const sanctumAuth = require('../middleware/sanctumAuth');
const { register, login, logout } = require('../handlers/authHandler');
const { registerPayloadSchema, loginPayloadSchema } = require('../validators/authValidator')
const { success, error } = require('../../utils/ApiResponser')
module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: register,
        options: {
            validate: {
                payload: registerPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response(error({} ,'error', err.message)).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: login,
        options: {
            validate: {
                payload: loginPayloadSchema,
                failAction: (request, h, err) => {
                    return h.response(error({} ,err.message, 400)).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/logout',
        handler: logout,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    }
]