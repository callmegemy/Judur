const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle live stream start
  socket.on('start-live', (data) => {
    console.log(`Live stream started by: ${data.userId}`);
    
    // Notify all viewers that the stream has started
    socket.broadcast.emit('start-live', { userId: data.userId });
  });

  // Handle offer (broadcaster -> viewers)
  socket.on('offer', (offer) => {
    console.log('Received offer from broadcaster');

    // Broadcast offer to all connected clients except the sender
    socket.broadcast.emit('offer', offer);
  });

  // Handle answer (viewer -> broadcaster)
  socket.on('answer', (answer) => {
    console.log('Received answer from viewer');

    // Broadcast the answer back to the broadcaster
    socket.broadcast.emit('answer', answer);
  });

  // Handle ICE candidate exchange
  socket.on('candidate', (candidate) => {
    console.log('Received ICE candidate');

    // Broadcast candidate to peers (broadcaster and viewers)
    socket.broadcast.emit('candidate', candidate);
  });

  // Handle live stream end
  socket.on('end-live', (data) => {
    console.log(`Live stream ended by: ${data.userId}`);
    
    // Notify all viewers that the stream has ended
    socket.broadcast.emit('end-live', { userId: data.userId });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on *:3000');
});
