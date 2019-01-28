var socket = io();

const message = { body: 'hi', user: 'john' };

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createMessage', message);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
