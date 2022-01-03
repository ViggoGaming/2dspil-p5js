//const maze = require('./game/modules/mazeNode')
//const tile = require('./game/modules/tile')
//let Tile = new tile()
//let Maze = new maze()

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = 3000;
const DEBUG = true

app.use(express.static(__dirname + '/game/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/game/index.html");
})

io.on('connection', (socket) => {

  socket.on('playerJoin', (data) => {
    if (DEBUG) {
      console.log(socket.id + " " + data.x + " " + data.y + " " + data.angle + " " + data.alive);
    }

    var player = new Player(socket.id, data.x, data.y, data.angle, data.bulletX, data.bulletY, data.alive);
    players.push(player);
  })

  socket.on('playerUpdate', (data) => {
    var player;
    for (var i = 0; i < players.length; i++) {
      if (players[i].id == socket.id) {
        player = players[i];
        break;
      }
    }
    
    if (player != undefined) {
      player.x = data.x;
      player.y = data.y;
      player.angle = data.angle;
      player.bulletX = data.bulletX
      player.bulletY = data.bulletY
    }
  })

  socket.on('playerHit', (data) => {
    var player;
    for (var i = 0; i < players.length; i++) {
      if (players[i].id == socket.id) {
        player = players[i];
        break;
      }
    }

    if (player != undefined) {
      player.alive = data.alive;
    }
  })

  socket.on('disconnect', () => {
    console.log('Disconnect' + socket.id);
    var player;
    for (var i = 0; i < players.length; i++) {
      if (players[i].id == socket.id) {
        player = players[i];
        break;
      }
    }
    players.splice(i, 1);
  })

})


var players = [];
//var map;


function serverUpdate() {

  io.sockets.emit('serverUpdate', players);

}

setInterval(serverUpdate, 1000 / 60);

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})

function Player(id, x, y, angle, bulletX, bulletY, alive) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.bulletX = bulletX;
  this.bulletY = bulletY;
  this.alive = alive;
}

/*map = new Maze(4,4)
maze.init()
maze.generateMaze(()=>{
  //maze.render()
  walls = maze.mazeToWalls()
})*/