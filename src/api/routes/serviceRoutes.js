const { getServices, getServiceById, getServicesByType, createService, updateService, deleteService } = require('../handlers/serviceHandler');
const { servicePayloadSchema } = require('../validators/serviceValidator');
const sanctumAuth = require('../middleware/sanctumAuth');
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
        method: 'GET',
        path: '/services/{type}/type',
        handler: getServicesByType
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
            {
              method: (request, h) => {
                const payload = request.payload;
          
                const parseJSON = (fieldName) => {
                  if (typeof payload[fieldName] === 'string') {
                    try {
                      payload[fieldName] = JSON.parse(payload[fieldName]);
                    } catch (err) {
                      throw Boom.badRequest(`Format ${fieldName} harus berupa JSON`);
                    }
                  }
                };
          
                parseJSON('detailServices');
                parseJSON('specialist');
                parseJSON('photo');
          
                return h.continue;
              }
            }
          ],
          validate: {
            payload: servicePayloadSchema,
            failAction: (request, h, err) => {
              return h
                .response({ status: 'fails', message: err.message })
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
    }
];