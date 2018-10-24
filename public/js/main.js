;(function(){
    var travellers=[
        'css/images/1.gif',
        'css/images/2.gif',
        'css/images/3.gif',
        'css/images/4.gif',
        'css/images/5.gif',
        'css/images/6.gif',
        'css/images/7.gif'
    ];
    var videos=[
        "videos/1.mp4",
        "videos/1.mp4"
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
    var modalImg = document.getElementById("img01");
    modalImg.src = 'css/images/winner.jpg';
    var video=  document.getElementById("xeneraVideo");
    var gameSection= document.getElementById("game");
    var videoSection = document.getElementById("videos");
    var image = document.getElementById("players");
    var winSection = document.getElementById("win")
    var totalTimer=0;
    var timeForPlay = 60;
    socket.on("saveAnReload",function(){
        player.totalTimer= totalTimer;
        sentNewPlayer(player)
        location.reload()
    })
    initVIdeo();
    socket.on("letsPlay",function(data){
        player = data;
            const promesa = new Promise(
                function(resolve, reject) {
                    difficulty = 35;
                    video.pause();
                    videoSection.style.display="none";
                    winSection.style.display="none";
                    gameSection.style.display="block";
                    myProgress.heightTotal = document.body.scrollHeight;
                    document.getElementById("myProgress").max=  myProgress.heightTotal;
                    image.src=travellers[0];
                }
            );
        promesa.then(scroDown())
        .then(setTimeout(()=>{
            socket.emit("activaDeviceMotion",true);
        },6000))
    });
    let timeElm = document.getElementById('timeElm');
    let timer = (x)=> {
        if(x === 0) {
            finishGame(false);
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
            timer(timeForPlay);
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
                finishGame(true); 
                return;
            }else{
                image.src = travellers[pictureNumber];
            }
        }
    }
    function scroDown() {
        window.scrollTo(0,document.body.scrollHeight);
    }
    function createBanner(win){
        gameSection.style.display="none"
        winSection.style.display="block";
        totalTimer =timeForPlay- timeJumping;
        modalImg.src = win ?'css/images/winner.jpg' :'css/images/loser.jpg' ;
        if(win===true){
            document.getElementById("points").innerHTML=totalTimer + "Segundos";
            document.getElementById("playerName").innerHTML=player.playerName;
        }
    }
    function finishGame(win){
        document.querySelector("#cohete").style.transition = "all 1s";   
        document.querySelector("#cohete").style.bottom="1000px";
        socket.emit("weFinish",true);
        if(win===true){
            setTimeout(function(){
                createBanner(true)
            },2000)
        }else{
            setTimeout(function(){
                createBanner(false)
            },2000)
        }
    }
    function sentNewPlayer(player){
        console.log(player)
        var name = player.playerName;
        var mail =player.playerMail;
        var time = player.totalTimer;
        var tel = player.playerTel;
        var data = "name="+name+"&mail="+mail+"&time="+time+"&phone="+tel;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
        xhr.open("POST", "http://localhost:3000/player");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("postman-token", "5974cb88-d26b-faff-2758-5e2ee6a4f6c9");
        xhr.send(data);
     }
    function loopVideos(){
        var whatVideo =Math.floor((Math.random() * videos.length));
        this.pause()
        video.src=videos[whatVideo];
        video.play();
    }
    function initVIdeo(){
       video.src = videos[0];
       gameSection.style.display="none";
       winSection.style.display="none";
       videoSection.style.display="block";
    }
    video.addEventListener('ended',loopVideos);
}());
