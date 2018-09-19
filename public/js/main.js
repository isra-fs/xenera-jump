
var socket = io();
console.log(socket)
socket.on("levelUp",function(){
    console.log("jump")
    scrollTop()
})
var c=0;
function scrollTop(){
    window.scrollBy(0,-1);
    console.log(c++)
}
function scroDown() {
    for(let i=0; i<100; i++){
    setTimeout( window.scrollBy(0, 100),2000);
    }
}
