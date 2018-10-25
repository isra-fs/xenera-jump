
//sqlite3 require file
const sqlite3 = require('sqlite3').verbose();
//sqlite instance
var db = new sqlite3.Database('db/dashboard.db');
var express = require('express');
const opn = require('opn');
var bodyParser = require("body-parser");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
//external files
var my_player = require('./dashboards/players');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// POST market_elevator_download
app.post('/player', (req, res) => {
  try {
      let player = req.body;
      console.log(player)
      //let player = { id: 1, date: '2018-01-26' }
      my_player.newPlayer(db, player);
     // getElevator();
  } catch (error) {  
      res.status(500).send('Something broke!')
  }
  res.end('Ok,request was successfull');
});
app.get('/list_player', function (req, res) {
  res.sendFile(__dirname + '/table.html');    
})
/*table_order functios*/
var getListPlayers = () => {
  my_player.getPlayers(false,db,(data)=>{
      io.emit('listPlayers', data); 
  });   
};
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/jump', function(req, res){
    res.sendFile(__dirname + '/jump.html');
});

io.on('connection', function(socket){
  console.log("newClient")
  socket.on("endFromPhone",function(){
    console.log("saveAnReload")
    io.emit("saveAnReload",true);
  })
  socket.on("activaDeviceMotion",function(){
    io.emit("deviceMotionActivated",true);
  })
  socket.on('startGame', function(msg){
    console.log(msg)
    io.emit("letsPlay",msg);
  });
  socket.on("jump",function(){
      io.emit('levelUp',true);
  });
  
  socket.on('weFinish',function(){
    console.log("weFinihs")
    io.emit('aceptFinish',true);
  });
  socket.on("getListPlayers",(data)=>{
    getListPlayers();
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
  my_player.delteDEv(db)
  console.log("##############Server is working##############")
  var wifiAddress =getIPAddress();
  opn('http://localhost:3000', {app: 'Chrome'});
  console.log("Write in your Device browser: " +"http://"+ wifiAddress.IPv4 +":3000/jump")
});