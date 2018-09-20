var socket = io();

socket.on("stopJump",function(){
    window.removeEventListener("devicemotion", accelerometerUpdate,true);
})
function startGame (){
    document.querySelector('.start-jumping').addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('hide-jumping');
        // and grab it with a simple querySelector
        [].map.call(document.querySelectorAll('.xenera-jump > h2'), function(el) {
        // classList supports 'contains', 'add', 'remove', and 'toggle'
            el.classList.toggle('show');
        });
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