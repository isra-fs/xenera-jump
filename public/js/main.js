;(function(){
    var videos=[
        "videos/1.mp4",
        "videos/1.mp4",
        "videos/1.mp4"
    ]
    var c=0;
    var socket = io();
    var jumps=0;
    var auxCont=0;
    var pictureNumber =0;
    var difficulty;
    var myProgress={
        heightTotal:0,
        totalAvanced:0
    }
    var video=  document.getElementById("xeneraVideo");
    var gameSection= document.getElementById("game");
    var videoSection = document.getElementById("videos");
    initVIdeo();
    socket.on("letsPlay",function(data){
        difficulty = "easy"
        video.pause();
        videoSection.style.display="none";
        gameSection.style.display="block";
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
        timer(60);
    });
    
    socket.on("levelUp",function(){
        scrollTop()
        jumps++;
        document.getElementById("jumps").innerHTML=Math.trunc(jumps/2);
        document.getElementById("myProgress").value= myProgress.totalAvanced;
    })
    var changePicture =Math.trunc (9101/30/5);
    function scrollTop(){
        myProgress.totalAvanced+=30;
        auxCont++;
        window.scrollBy(0,-30);
        if(auxCont===changePicture){
            pictureNumber=pictureNumber+1;
            auxCont=0;
            var image = document.getElementById("players");
            image.src = "css/images/" + pictureNumber + ".png";
        }
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
    function loopVideos(){
        var whatVideo =Math.floor((Math.random() * 3));
        console.log(whatVideo)
        this.pause()
        video.src=videos[whatVideo];
        video.play();
    }
    function initVIdeo(){
       video.src = videos[0];
       gameSection.style.display="none";
       videoSection.style.display="blok";
    }
    video.addEventListener('ended',loopVideos);
}());
