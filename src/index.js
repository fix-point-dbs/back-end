const { createServer } = require('./config/server');
const { db } = require('./config/database');

const start = async () => {
  try {
    // Buat server
    const { hapiServer, socketServer } = await createServer();

    // Sync DB
    // await db.sync();
    console.log('✅ Database synced successfully');

    // Start Hapi
    await hapiServer.start();
    console.log(`🚀 Hapi server running at: ${hapiServer.info.uri}`);

    // Start Socket.IO (gunakan listener yang sudah disiapkan)
    socketServer.listen(3001, () => {
      console.log('⚡ Socket.IO server running at: http://localhost:3001');
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
};

start();
