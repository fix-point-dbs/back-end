const { startServer } = require('./config/server');
const { db } = require('./config/database');

const start = async () => {
  try {
    

    // Sync DB
    await db.sync();
    console.log('✅ Database synced successfully');

    startServer();
  } catch (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
};

start();
