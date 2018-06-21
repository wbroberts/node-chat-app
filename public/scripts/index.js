const socket = io();

socket.on('connect', function () {
  console.log('connected to server');
  
  socket.on('connectMessage', function (message) {
    console.log(message.text);
  })
});

socket.on('newMessage', function (message) {
  console.log(message);
});

socket.on('newUser', function (message) {
  console.log(message);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});
