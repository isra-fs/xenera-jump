var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/jump', function(req, res){
    res.sendFile(__dirname + '/jump.html');
  });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('startGame', function(msg){
    io.emit("letsPlay",true);
  });
  socket.on("jump",function(){
      console.log("jump")
      io.emit('levelUp',true);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});