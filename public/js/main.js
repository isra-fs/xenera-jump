
var socket = io();
console.log(socket)
socket.on("letsPlay",function(data){
    let timeElm = document.getElementById('timeElm');
    let timer = function(x) {
    if(x === 0) {
        return;
    }
    timeElm.innerHTML = x;
        return setTimeout(() => {timer(--x)}, 1000)
    }
    timer(30);
});
socket.on("levelUp",function(){
    console.log("jump")
    scrollTop()
})
var c=0;
function scrollTop(){
    window.scrollBy(0,-20);
    console.log(c++)
}
function scroDown() {
    for(let i=0; i<100; i++){
    setTimeout( window.scrollBy(0, 100),2000);
    }
}
