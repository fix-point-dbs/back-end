const sanctumAuth = require('../middleware/sanctumAuth');
const { register, login, logout } = require('../handlers/authHandler');
module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: register
    },
    {
        method: 'POST',
        path: '/login',
        handler: login
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