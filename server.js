var express = require('express');
const opn = require('opn');

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

  socket.on('startGame', function(msg){
    io.emit("letsPlay",true);
  });
  socket.on("jump",function(){
      io.emit('levelUp',true);
  });
  socket.on("stopJump",function(){
    io.emit("stopJumpPhone",true);
  });
});

http.listen(3000, function(){
  console.log("##############Server is working##############")
  console.log("Write in your browser: " + "localhost:3000")
  opn('http://localhost:3000', {app: 'Chrome'});
});