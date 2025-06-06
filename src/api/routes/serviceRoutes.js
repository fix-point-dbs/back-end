const { getServices, getServiceById, getServicesByType, createService, updateService, deleteService, updateStatus } = require('../handlers/serviceHandler');
const { servicePayloadSchema } = require('../validators/serviceValidator');
const sanctumAuth = require('../middleware/sanctumAuth');
const { error } = require('../../utils/ApiResponser');
module.exports = [
    {
        method: 'GET',
        path: '/services',
        handler: getServices
    },
    {
        method: 'GET',
        path: '/services/{id}',
        handler: getServiceById
    },
    {
        method: 'POST',
        path: '/services',
        handler: createService,
        options: {
          payload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data'
          },
          pre: [
            sanctumAuth,
          ],
          validate: {
            payload: servicePayloadSchema,
            failAction: (request, h, err) => {
              return h
                .response(error({},err.message, 400))
                .code(400)
                .takeover();
            }
          }
        },
      },
      
    {
        method: 'PUT',
        path: '/services/{id}',
        handler: updateService,
        options: {
          payload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data'
          },
          pre:[
            sanctumAuth
          ]
        }
    },
    {
        method: 'DELETE',
        path: '/services/{id}',
        handler: deleteService,
        options: {
            pre: [
                sanctumAuth
            ]
        }
    },
    {
        method: 'PUT',
        path: '/services/status/{id}',
        handler: updateStatus
    }
];