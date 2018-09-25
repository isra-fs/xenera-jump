var socket = io();
socket.on("stopJumpPhone",function(){
    window.removeEventListener("devicemotion", accelerometerUpdate,true);
    document.querySelector('.start-jumping').classList.remove('hide-jumping');
    document.getElementById('jumping').classList.toggle('hide-jumping');
});
function startGame (){
    event.preventDefault();
    document.querySelector('.start-jumping').classList.toggle('hide-jumping');
    [].map.call(document.querySelectorAll('.xenera-jump > h2'), function(el) {
        el.classList.toggle('show');
    });
    socket.emit("startGame",true);
    window.addEventListener("devicemotion", accelerometerUpdate,true);
}
var weCanJump= true;
setInterval(function(){
    if(!weCanJump){
        weCanJump = true ? true : false;
    }
},500)
function accelerometerUpdate(event) {
    var ax= event.acceleration.x * 100 ;
    var ay = event.acceleration.y * 100 ;
    var az = event.acceleration.z * 100 ;
    if (ay > 600 || ax > 600 || az > 600 ){
        if(weCanJump){
            socket.emit("jump",true)
            weCanJump=false;
        }
    }
}