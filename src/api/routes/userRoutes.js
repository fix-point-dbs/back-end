const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword
} = require('../handlers/userHandler');
const sanctumAuth = require('../middleware/sanctumAuth');
// const { userPayloadSchema } = require('../validators/userValidator');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: getUsers
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: getUserById
  },
  {
    method: 'POST',
    path: '/users',
    handler: createUser,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: updateUser
  },
  {
    method: 'PUT',
    path: '/users/{id}/change-password',
    handler: changePassword
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUser,
    options: {
      pre: [
        sanctumAuth
      ]
    }
  }
];
