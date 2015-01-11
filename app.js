/**
 * Created by narendra on 11/1/15.
 */

//Node server which support socket.io


var express = require('express');
var path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);

console.log("Server started on port 8081");

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '')));

/*  Shared Variable on Server Side */

var shared = {

};
io.on('connection', function (socket) {
  socket.on('ochange', function (data) {
    console.log("Something changed at client side", data);
    console.log(shared);

    switch (data.operation){
      case "add":
      case "update":
        if(shared[data.key] !== data.val){
          shared[data.key] = data.val;
          socket.broadcast.emit('ochange', data);
          /*Send Changes only when there is a need to change*/
        }
        break;
    }
  });
  socket.on('getSharedVariable', function (data) {
    console.log("Request for shared variabled");
    socket.emit('setSharedVariable', shared);
  });
});