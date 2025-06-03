const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const { Server } = require('socket.io');

// Route imports
const userRoutes = require('../api/routes/userRoutes');
const serviceRoutes = require('../api/routes/serviceRoutes');
const bookingRoutes = require('../api/routes/bookingRoutes');
const reviewRoutes = require('../api/routes/reviewRoutes');
const authRoutes = require('../api/routes/authRoutes');
const chatRoutes = require('../api/routes/chatRoutes');
const listServiceRoutes = require('../api/routes/listServiceRoutes');

// Sequelize
const { Chat, Message, Booking } = require('../models');

let io; // Socket.IO instance

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
      },
      files: {
        relativeTo: Path.join(__dirname, '../uploads')
      }
    }
  });

  await server.register(Inert);

  // Serve static files
  server.route({
    method: 'GET',
    path: '/uploads/{folder}/{filename}',
    handler: {
      file: (request) => {
        const { folder, filename } = request.params;
        return `${folder}/${filename}`;
      }
    }
  });

  // Register all routes
  server.route([
    ...userRoutes,
    ...serviceRoutes,
    ...bookingRoutes,
    ...reviewRoutes,
    ...authRoutes,
    ...chatRoutes,
    ...listServiceRoutes
  ]);

  // Initialize server (tanpa start)
  await server.initialize();

  // Init Socket.IO langsung dari server.listener (tanpa createServer)
  io = new Server(server.listener, {
    cors: {
      origin: "*",
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

    socket.on('join_booking', (booking_id) => {
      socket.join(`booking_${booking_id}`);
    });

    socket.on('update_status_booking', async ({booking_id, status}) => {
      const booking = await Booking.update({ status: status }, { where: { id: booking_id } });
      const updateBooking = await Booking.findByPk(booking_id); // ambil data setelah update
      io.to(`booking_${booking_id}`).emit('receive_status', updateBooking);
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return server;
};

// Untuk menjalankan server langsung
const startServer = async () => {
  const hapiServer = await createServer();
  await hapiServer.start();
  console.log(`🚀 Hapi + Socket.IO server running at: ${hapiServer.info.uri}`);
};

module.exports = {
  createServer,
  startServer,
  getIO: () => io
};
