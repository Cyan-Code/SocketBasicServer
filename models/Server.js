// Servidor de express
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path');
const Sockets = require('./Sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app)

    // Configuracion de Sockets
    this.io = socketio(this.server, {cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }});
  }

  middelwares () {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      next();
    });
    this.app.use( express.static( path.resolve(__dirname, '../public') ) )
  }

  consgurarSockets() {
    new Sockets( this.io );
  }

  execute() {
    // inicializar middelwares()
    this.middelwares();

    // Inicializar sockets
    this.consgurarSockets()

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en 8080', this.port);
    });
  }

}


module.exports = Server
