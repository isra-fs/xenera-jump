var socket = io();
var jumpPhone = (function(w,d){
    var goDown = false;
    var goUp = false;
    var c=0;
    
    //window.confirm("Fin Del Juego Acepta para Terminar");
    socket.on("deviceMotionActivated",function(){
        w.addEventListener('devicemotion',motionDetectionHandler)
    });
    socket.on('aceptFinish',function(){
       finishCurrentGame()
    })
    function finishCurrentGame(){
        if (confirm("Fin Del Juego Acepta para Terminar!")) {
            socket.emit('endFromPhone',true);
             location.reload() 
        } else {
                socket.emit('endFromPhone',true);
            location.reload()        
        } 
        w.removeEventListener("devicemotion",motionDetectionHandler);
    }
    function motionDetectionHandler(e){
        goDown = e.accelerationIncludingGravity.y< 0 ? true: goDown;
        goUp= e.accelerationIncludingGravity.y>5 ?true:goUp;
        var countJumps = goDown===true && goUp===true ? true : null;
        if(countJumps ===true){
            goDown= goUp = false;
            c++;
            socket.emit("jump",true);
        }
    }
    return {
        startGame: function(){
            var playerNamer = document.getElementById("playerNamer").value;
            var playerMail= document.getElementById("playerMail").value; 
            var playerTel= document.getElementById("playerTel").value; 
            playerMail= !playerMail ? "N/A" : playerMail;
            playerTel= !playerTel ? "000000" :playerTel;
            if( playerNamer){
                var  player ={
                    "playerName": playerNamer,
                    "playerMail" :playerMail,
                    "playerTel":playerTel
                }        
                socket.emit("startGame",player);
                document.getElementById("gameZone").style.display="none";
            }
           
        }
    }
}(window,document));
