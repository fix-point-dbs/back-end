const Hapi = require('@hapi/hapi');
const http = require('http');
const { Server } = require('socket.io');
const Inert = require('@hapi/inert');
const Path = require('path');

// Route imports
const userRoutes = require('../api/routes/userRoutes');
const serviceRoutes = require('../api/routes/serviceRoutes');
const bookingRoutes = require('../api/routes/bookingRoutes');
const reviewRoutes = require('../api/routes/reviewRoutes');
const authRoutes = require('../api/routes/authRoutes');
const chatRoutes = require('../api/routes/chatRoutes');

// Sequelize
const { Chat, Message } = require('../models');

let io; // Socket.IO instance

const createServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      },
      files: {
        relativeTo: Path.join(__dirname, '../uploads') // direktori utama file
      }
    }
  });

  await server.register(Inert);
 // ✅ PENTING! Serve folder uploads secara absolut
 server.route({
  method: 'GET',
  path: '/uploads/{folder}/{filename}', // contoh: /uploads/photo-services/foto1.jpg
  handler: {
    file: (request) => {
      const { folder, filename } = request.params;
      return `${folder}/${filename}`;
    }
  }
});

//  server.route({
//   method: 'GET',
//   path: '/uploads/{param*}',
//   handler: () => {
//     return path.join(__dirname, '../uploads');
//   }
//   // handler: {
//   //   directory: {
//   //     path: path.join(__dirname, '../uploads/photo-services/asd.png'),
//   //     index: false,
//   //     listing: false
//   //   }
//   // }
// });
  // Serve static files in `/uploads` folder

  // Daftarkan semua route
  server.route(userRoutes);
  server.route(serviceRoutes);
  server.route(bookingRoutes);
  server.route(reviewRoutes);
  server.route(authRoutes);
  server.route(chatRoutes);
 
  // Bungkus dengan http server
  const listener = http.createServer(server.listener);

  // Init Socket.IO
  io = new Server(listener, {
    cors: {
      origin: "*", // ganti ke domain frontend di production
      methods: ["GET", "POST"]
    }
  });

  // Socket.IO logic
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('join_chat', (chat_id) => {
      socket.join(`chat_${chat_id}`);
    });

    socket.on('send_message', async ({ chat_id, sender_id, message }) => {
      const newMessage = await Message.create({
        chat_id,
        sender_id,
        message,
        is_read: false
      });

      await Chat.update({ last_message: message }, { where: { id: chat_id } });

      io.to(`chat_${chat_id}`).emit('receive_message', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  // Start Hapi server (tanpa listener.listen di sini)
  await server.initialize();

  return { hapiServer: server, socketServer: listener };
};

// Untuk menjalankan server langsung
const startServer = async () => {
  const { hapiServer, socketServer } = await createServer();

  await hapiServer.start();
  socketServer.listen(3001, () => {
    console.log(`🚀 Hapi server running at: ${hapiServer.info.uri}`);
    console.log('⚡ Socket.IO server running at: http://localhost:3001');
  });
};

module.exports = {
  createServer,
  startServer,
  getIO: () => io
};
