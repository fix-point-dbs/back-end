const Hapi = require('@hapi/hapi');
const userRoutes = require('../api/routes/userRoutes');

const createServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Daftarkan route
  server.route(userRoutes);

  return server;
};

module.exports = createServer;
