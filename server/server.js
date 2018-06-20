const http = require('http');
const c = require('ansi-colors');
const app = require('./app');
const socket = require('socket.io');


const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
  console.log('user connected to server');

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});

server.listen(port, () => console.log(`Server is running on port ${c.blue(port)}`));