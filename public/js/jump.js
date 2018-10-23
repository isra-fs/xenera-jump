var socket = io();
var jumpPhone = (function(w,d){
    var goDown = false;
    var goUp = false;
    var c=0;
    
    //window.confirm("Fin Del Juego Acepta para Terminar");
    socket.on('aceptFinish',function(){
       //w.confirm("Fin Del Juego Acepta para Terminar");
       finishCurrentGame()
    })
    socket.on("stopJumpPhone",function(){
        w.removeEventListener("devicemotion",motionDetectionHandler);
        d.querySelector('.start-jumping').classList.remove('hide-jumping');
       // d.getElementById('jumping').classList.toggle('hide-jumping');
       finishCurrentGame()
    });
    function finishCurrentGame(){
        if (confirm("Fin Del Juego Acepta para Terminar!")) {
            socket.emit('endFromPhone',true);
             location.reload() 
        } else {
                socket.emit('endFromPhone',true);
            location.reload()        
        } 
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
            if(playerMail  && playerNamer){
                var  player ={
                    "playerName": playerNamer,
                    "playerMail" :playerMail
                }            
                socket.emit("startGame",player);
                w.addEventListener('devicemotion',motionDetectionHandler)
            }
           
        }
    }
}(window,document));
