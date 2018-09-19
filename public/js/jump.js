
var socket = io();
window.addEventListener("devicemotion", accelerometerUpdate, true);
function accelerometerUpdate(event) {
    var aX = event.acceleration.x * 100 ;
    var aY = event.acceleration.y * 100 ;
    var aZ = event.acceleration.z * 100 ;
    if (aY > 400 || ax > 400 || az > 400 ){
        document.getElementById("moAccel").innerHTML="Jumping";
        socket.emit("jump",true);
    } else{ 
        document.getElementById("moAccel").innerHTML="Resting";
    }
}