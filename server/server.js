const http = require('http');
const c = require('ansi-colors');
const app = require('./app');
const socket = require('socket.io');

const { generateMessage, generateLocationMessage, generateUsers } = require('./utils/message');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socket(server);

// To count how many users are in chatroom 
let userCounter = 0;

io.on('connection', socket => {
  // Increase the user count
  userCounter++;

  console.log(userCounter + ' users');
  // Greeting message when a user connects
  socket.emit('connectMessage', generateMessage('Admin', 'Welcome to the chatroom'));
  // Message to all users that a new user joined
  socket.broadcast.emit('newUser', [generateMessage('Admin', 'A new user joined the chatroom'), generateUsers(userCounter)]);
  socket.emit('addUser', generateUsers(userCounter));

  // Listens for a new message
  socket.on('createMessage', message => {
    // Sends out the message to the client
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  // Listens for location
  socket.on('createLocationMessage', location => {
    io.emit('newLocation', generateLocationMessage(location.username, location.lat, location.long));
  });

  socket.on('disconnect', () => {
    // Decrease the user count
    userCounter--;
    socket.broadcast.emit('removeUser', [generateMessage('Admin', 'A user left the chatroom'), generateUsers(userCounter)]);

    console.log(userCounter + ' users');
  });

});

server.listen(port, () => console.log(`Server is running on port ${c.blue(port)}`));