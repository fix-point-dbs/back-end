const createServer = require('./config/server');
const { db } = require('./config/database');
const { User, DetailUser } = require('./models');
const start = async () => {
  const server = await createServer();

  (async () => {
    await db.sync();
    console.log('Database synced successfully');
  })();
  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

start();