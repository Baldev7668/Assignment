const taskSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('New WebSocket connection established.');
  
      socket.on('task:update', (data) => {
        io.emit('task:update', data); // Broadcast task updates
      });
    });
  };
  
  module.exports = taskSocket;
  