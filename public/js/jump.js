
var socket = io();
socket.on("stopJumpPhone",function(){
    window.removeEventListener("devicemotion", accelerometerUpdate,true);
    document.querySelector('.start-jumping').classList.remove('hide-jumping');
    document.getElementById('jumping').classList.toggle('hide-jumping');
});
var jumpPhone = (function(){
    var goDown = false;
    var goUp = false;
    var c=0;
    return {
        startGame: function(){
            document.querySelector('.start-jumping').classList.toggle('hide-jumping');
            [].map.call(document.querySelectorAll('.xenera-jump > h2'), function(el) {
                el.classList.toggle('show');
            });
            socket.emit("startGame",true);
            window.addEventListener('devicemotion',function(e){
                goDown = e.accelerationIncludingGravity.y< 0 ? true: goDown;
                goUp= e.accelerationIncludingGravity.y>5 ?true:goUp;
                var countJumps = goDown===true && goUp===true ? true : null;
                if(countJumps ===true){
                    goDown= goUp = false;
                    c++;
                    document.getElementById("yAceleration").innerHTML=Math.trunc(c/2);
                    socket.emit("jump",true);
                }
                
            })
        }
    }
}())
