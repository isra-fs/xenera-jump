;(function(){
    var travellers=[
        'css/images/1.gif',
        'css/images/2.gif',
        'css/images/3.gif',
        'css/images/4.gif',
        'css/images/5.gif'
    ];
    var videos=[
        "videos/1.mp4",
        "videos/2.mp4"
    ]
    var c=0;
    var socket = io();
    var jumps=0;
    var auxCont=0;
    var pictureNumber =0;
    var difficulty;
    var timeJumping=0;
    var player;
    var myProgress={
        heightTotal:0,
        totalAvanced:0
    }
    // Get the modal
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    var video=  document.getElementById("xeneraVideo");
    var gameSection= document.getElementById("game");
    var videoSection = document.getElementById("videos");
    var image = document.getElementById("players");
    var winSection = document.getElementById("win")
    initVIdeo();
    socket.on("letsPlay",function(data){
        player = data;
            const promesa = new Promise(
                function(resolve, reject) {
                    difficulty = data.difficulty;
                    video.pause();
                    videoSection.style.display="none";
                    winSection.style.display="none";
                    gameSection.style.display="block";
                    myProgress.heightTotal = document.body.scrollHeight;
                    document.getElementById("myProgress").max=  myProgress.heightTotal;
                }
            );
        promesa.then(scroDown()).then(setTimeout(()=>{image.src=travellers[0]},6000))
    });
    let timeElm = document.getElementById('timeElm');
    let timer = (x)=> {
        if(x === 0) {
            socket.emit("stopJump",true);
            setTimeout(function() {location.reload();}, 5000);
            jumps=0;
            return;
        }
        timeJumping=x;
        timeElm.innerHTML = x;
            return setTimeout(() => {timer(--x)}, 1000)
    }
 
    socket.on("levelUp",function(){
        scrollTop()
        jumps++;
        document.getElementById("jumps").innerHTML=Math.trunc(jumps/2);
        document.getElementById("myProgress").value= myProgress.totalAvanced;
    })
    
    var jumping= true;
    function scrollTop(){
        if(jumping){
            timer(60);
            jumping=false;
        }
        var myBodyHeight = document.body.clientHeight;
        var changePicture =Math.trunc (myBodyHeight/difficulty/travellers.length);
        myProgress.totalAvanced+=difficulty;
        auxCont++;
        window.scrollBy(0,-difficulty);
        if(auxCont===changePicture){
            pictureNumber=pictureNumber+1;
            auxCont=0;
            if(pictureNumber===travellers.length){
                go(); 
            }else{
                image.src = travellers[pictureNumber];
            }
        }
    }
    function scroDown() {
        window.scrollTo(0,document.body.scrollHeight);
    }
    function go(){
        document.querySelector("#cohete").style.transition = "all 2s";   
        document.querySelector("#cohete").style.bottom="1000px";
        socket.emit("stopJump",true);
        setTimeout(function(){
            gameSection.style.display="none"
            winSection.style.display="block";
            var totalTimer =60- timeJumping;
            modal.style.display = "block";
            modalImg.src = 'css/images/winner.gif';
            document.getElementById("points").innerHTML="Felicidades: " +player.playerName+ " Time: "+ totalTimer;
        },2000)
    }
    function loopVideos(){
        var whatVideo =Math.floor((Math.random() * videos.length));
        console.log(whatVideo)
        this.pause()
        video.src=videos[whatVideo];
        video.play();
    }
    function initVIdeo(){
       video.src = videos[0];
       gameSection.style.display="none";
       videoSection.style.display="block";
    }
    video.addEventListener('ended',loopVideos);
}());
