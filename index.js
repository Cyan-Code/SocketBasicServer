// Servidor de express
const server = require('http').createServer();

// Servidor de sockets
const io = require('socket.io')(server);

// configuracion del socket
io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(8080, () => {
  console.log('Server corriendo en 8080');
});

