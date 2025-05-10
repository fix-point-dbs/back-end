const { getUsers, createUser } = require('../handlers/userHandler');
const { userPayloadSchema } = require('../validators/userValidator');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: getUsers
  },
  {
    method: 'POST',
    path: '/users',
    handler: createUser,
    options: {
      validate: {
        payload: userPayloadSchema,
        failAction: (request, h, err) => {
          return h.response({ status: 'fail', message: err.message }).code(400).takeover();
        }
      }
    }
  }
];
