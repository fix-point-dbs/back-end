const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../handlers/userHandler');

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
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUser
  }
];
