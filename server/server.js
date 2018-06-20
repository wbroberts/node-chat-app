const http = require('http');
const c = require('ansi-colors');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running on port ${c.blue(port)}`));