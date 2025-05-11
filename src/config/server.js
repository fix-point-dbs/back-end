const Hapi = require('@hapi/hapi');
const userRoutes = require('../api/routes/userRoutes');

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

  return server;
};

module.exports = createServer;
