
var socket = io();
//window.addEventListener("devicemotion", accelerometerUpdate, true);



 // querySelector returns the first element it finds with the correct selector
        // addEventListener is roughly analogous to $.on()
        

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
    window.addEventListener("devicemotion", accelerometerUpdate, true);
    
}
function accelerometerUpdate(event) {
    var ax= event.acceleration.x * 100 ;
    var ay = event.acceleration.y * 100 ;
    var az = event.acceleration.z * 100 ;
    if (ay > 400 || ax > 400 || az > 400 ){
        socket.emit("jump",true);
    }
}