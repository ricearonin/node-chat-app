const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  //socket.emit from Admin text welcome to the chat app

  socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));

  //socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'A new user has joined!'),
  );

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('name and room name are required');
    }
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
