const createServer = require('./config/server');
const { sequelize } = require('./models/index');
const start = async () => {
  const server = await createServer();

  await sequelize.sync();
  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

start();