const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const cors = require('cors')
const app = express();
const chatLog = {"log":[]};
let chatLogParsed ;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Real-time Chat Server\n');
  
});

const io = socketIo(server,{
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('chat message', (msg) => {
    chatLog.log.push(msg);
    chatLogParsed = JSON.stringify(chatLog);
    io.emit('chat message', chatLogParsed); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});