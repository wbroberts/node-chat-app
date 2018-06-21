const http = require('http');
const c = require('ansi-colors');
const app = require('./app');
const socket = require('socket.io');

const { generateMessage } = require('./utils/message');


const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
  console.log('New user connected to server');
  // Greeting message when a user connects
  socket.emit('connectMessage', generateMessage('Admin', 'Welcome to the chatroom'));
  // Message to all users that a new user joined
  socket.broadcast.emit('newUser', generateMessage('Admin', 'A new user joined the room'));

  // Listens for a new message
  socket.on('createMessage', message => {
    // Sends out the message to the client
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

});

server.listen(port, () => console.log(`Server is running on port ${c.blue(port)}`));