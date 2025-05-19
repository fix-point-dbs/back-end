const Hapi = require('@hapi/hapi');
const userRoutes = require('../api/routes/userRoutes');
const serviceRoutes = require('../api/routes/serviceRoutes');
const bookingRoutes = require('../api/routes/bookingRoutes');

const createServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Boleh semua origin
        // additionalHeaders: ['authorization']
      }
    }
  });

  // Daftarkan route
  server.route(userRoutes);
  server.route(serviceRoutes);
  server.route(bookingRoutes);

  return server;
};

module.exports = createServer;
