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
  // {
  //   method: 'POST',
  //   path: '/users',
  //   handler: createUser,
  //   options: {
  //     validate: {
  //       payload: userPayloadSchema,
  //       failAction: (request, h, err) => {
  //         return h.response({ status: 'fail', message: err.message }).code(400).takeover();
  //       }
  //     }
  //   }
  // },
  // {
  //   method: 'PUT',
  //   path: '/users/{id}',
  //   handler: updateUser,
  //   options: {
  //     validate: {
  //       payload: userPayloadSchema,
  //       failAction: (request, h, err) => {
  //         return h.response({ status: 'fail', message: err.message }).code(400).takeover();
  //       }
  //     }
  //   }
  // },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUser
  }
];
