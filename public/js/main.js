;(function(){
    var socket = io();
    var jumps=0;
    var myProgress={
        heightTotal:0,
        totalAvanced:0
    }
    socket.on("letsPlay",function(data){
        myProgress.heightTotal = document.body.scrollHeight;
        document.getElementById("myProgress").max=  myProgress.heightTotal;
        scroDown();
        let timeElm = document.getElementById('timeElm');
        let timer = function(x) {
        if(x === 0) {
            socket.emit("stopJump",true);
            go();
            setTimeout(function() {
                location.reload();
                scroDown();
            }, 5000);
            jumps=0;
            return;
        }
        timeElm.innerHTML = x;
            return setTimeout(() => {timer(--x)}, 1000)
        }
        timer(20);
    });
    socket.on("levelUp",function(){
        scrollTop()
        jumps++;
        document.getElementById("jumps").innerHTML=Math.trunc(jumps/2);
        document.getElementById("myProgress").value= myProgress.totalAvanced;
    })
    var c=0;
    function scrollTop(){
        myProgress.totalAvanced+=10;
        window.scrollBy(0,-10);
    }
    function scroDown() {
        for(let i=0; i<100; i++){
        setTimeout( window.scrollBy(0, 100),2000);
        }
    }
    function go(){
        document.querySelector("#cohete").style.transition = "all 2s";   
        document.querySelector("#cohete").style.bottom="1000px";
    }
}());
