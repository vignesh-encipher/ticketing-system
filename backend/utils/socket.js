const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a specific ticket room
    socket.on('joinTicket', (ticketId) => {
      socket.join(`ticket_${ticketId}`);
      console.log(`User ${socket.id} joined ticket room: ticket_${ticketId}`);
    });

    // Leave a specific ticket room
    socket.on('leaveTicket', (ticketId) => {
      socket.leave(`ticket_${ticketId}`);
      console.log(`User ${socket.id} left ticket room: ticket_${ticketId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

const emitToTicket = (ticketId, event, data) => {
  if (io) {
    io.to(`ticket_${ticketId}`).emit(event, data);
  }
};

module.exports = { initSocket, getIO, emitToTicket };
