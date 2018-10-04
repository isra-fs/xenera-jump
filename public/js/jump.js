var jumpPhone = (function(w,d){
    var goDown = false;
    var goUp = false;
    var c=0;
    var socket = io();
    socket.on("stopJumpPhone",function(){
        w.removeEventListener("devicemotion",motionDetectionHandler);
        d.querySelector('.start-jumping').classList.remove('hide-jumping');
        d.getElementById('jumping').classList.toggle('hide-jumping');
    });
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
            d.querySelector('.start-jumping').classList.toggle('hide-jumping');
            d.querySelector('h2').classList.toggle('show');
            socket.emit("startGame",true);
            w.addEventListener('devicemotion',motionDetectionHandler)
        }
    }
}(window,document));
