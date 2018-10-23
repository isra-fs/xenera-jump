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
  socket.on("endFromPhone",function(){
    console.log("saveAnReload")
    io.emit("saveAnReload",true);
  })
  socket.on('startGame', function(msg){
    console.log(msg)
    io.emit("letsPlay",msg);
  });
  socket.on("jump",function(){
      io.emit('levelUp',true);
  });
  socket.on("stopJump",function(){
    io.emit("stopJumpPhone",true);
  });
  socket.on('weFinish',function(){
    console.log("weFinihs")
    io.emit('aceptFinish',true);
  })
});
function getIPAddress() {
  var addrInfo, ifaceDetails, _len;
  var localIPInfo = {};
  //Get the network interfaces
  var networkInterfaces = require('os').networkInterfaces();
  //Iterate over the network interfaces
  for (var ifaceName in networkInterfaces) {
      ifaceDetails = networkInterfaces[ifaceName];
      //Iterate over all interface details
      for (var _i = 0, _len = ifaceDetails.length; _i < _len; _i++) {
          addrInfo = ifaceDetails[_i];
          if (addrInfo.family === 'IPv4') {
              //Extract the IPv4 address
              if (!localIPInfo[ifaceName]) {
                  localIPInfo[ifaceName] = {};
              }
            localIPInfo[ifaceName].IPv4 = addrInfo.address;
           }
      }
  }
  if(localIPInfo["Wi-Fi"])
    return localIPInfo["Wi-Fi"];
  else return localIPInfo
}
http.listen(3000, function(){
  console.log("##############Server is working##############")
  var wifiAddress =getIPAddress();
 // opn('http://localhost:3000', {app: 'Chrome'});
  console.log("Write in your Device browser: " +"http://"+ wifiAddress.IPv4 +":3000/jump")
});