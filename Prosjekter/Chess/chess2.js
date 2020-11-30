var canvas = document.getElementById("canvas")
var background = document.getElementById("background")
var start = document.getElementById("start")
var bTime = document.getElementById("bTime")
var wTime = document.getElementById("wTime")
var blackClock = document.getElementById("blackClock")
var whiteClock = document.getElementById("whiteClock")
var wrapper = document.getElementById("wrapper")
var winner = document.getElementById("winner")
var player1 = document.getElementById("player1")
var player2 = document.getElementById("player2")
var wName = document.getElementById("wName")
var bName = document.getElementById("bName")
var wScore = document.getElementById("wScore")
var bScore = document.getElementById("bScore")
var select = document.querySelector("select")
var incrementEl = document.getElementById("increment")
var timeEl = document.getElementById("time")
var newGame = document.getElementById("newGame")
var left = document.getElementById("left")
var right = document.getElementById("right")
var bCap = document.getElementById("bCap")
var wCap = document.getElementById("wCap")
var bMaterial = document.getElementById("bMaterial")
var wMaterial = document.getElementById("wMaterial")
var mDifference = document.getElementById("mDifference")
var movesButton = document.getElementById("movesButton")
var wResign = document.getElementById("wResign")
var bResign = document.getElementById("bResign")
var wDraw = document.getElementById("wDraw")
var bDraw = document.getElementById("bDraw")
var moves = document.getElementById("moves")
var ba = background.getContext("2d")
var c = canvas.getContext("2d")
var bC = bCap.getContext("2d")
var wC = wCap.getContext("2d")
var w = window.innerWidth
var h = window.innerHeight
canvas.height = 0.9*h
canvas.width = canvas.height
background.height = 0.9*h
background.width = 0.64*w
bCap.height = h
bCap.width = w*0.8*0.1
wCap.height = h
wCap.width = w*0.8*0.1

var px = 0
var py = 0

var board = []
var bPieces = []
var wPieces = []
var turncount = 2
function setup(){
    board = [
        [-9,-10,-11,-12,-13,-14,-15,-16],
        [-1,-2,-3,-4,-5,-6,-7,-8],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [1,2,3,4,5,6,7,8],
        [9,10,11,12,13,14,15,16],
    ]
    wPieces = [
        {type:"p", img:0, moves:[], moved:false, pos:48, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:49, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:50, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:51, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:52, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:53, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:54, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:55, doubleMove:0},
        {type:"r", img:1, moves:[], moved:false, pos:56},
        {type:"n", img:2, moves:[], moved:false, pos:57},
        {type:"b", img:3, moves:[], moved:false, pos:58},
        {type:"q", img:4, moves:[], moved:false, pos:59},
        {type:"k", img:5, moves:[], moved:false, pos:60},
        {type:"b", img:3, moves:[], moved:false, pos:61},
        {type:"n", img:2, moves:[], moved:false, pos:62},
        {type:"r", img:1, moves:[], moved:false, pos:63},
    ]
    bPieces = [
        {type:"p", img:0, moves:[], moved:false, pos:8, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:9, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:10, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:11, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:12, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:13, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:14, doubleMove:0},
        {type:"p", img:0, moves:[], moved:false, pos:15, doubleMove:0},
        {type:"r", img:1, moves:[], moved:false, pos:0},
        {type:"n", img:2, moves:[], moved:false, pos:1},
        {type:"b", img:3, moves:[], moved:false, pos:2},
        {type:"q", img:4, moves:[], moved:false, pos:3},
        {type:"k", img:5, moves:[], moved:false, pos:4},
        {type:"b", img:3, moves:[], moved:false, pos:5},
        {type:"n", img:2, moves:[], moved:false, pos:6},
        {type:"r", img:1, moves:[], moved:false, pos:7},
    ]
    turncount = 2
}
setup()

//laster inn bilder og oppretter objekter for hver brikke
var big = new Image()
big.src="bigMarker.png"
var small = new Image()
small.src="smallMarker.png"

var wImgs = []
for(i=0; i<6;i++){
    wImgs.push(new Image())
}
[wImgs[0].src, wImgs[1].src,wImgs[2].src,wImgs[3].src,wImgs[4].src,wImgs[5].src] = ["wp.png", "wr.png", "wkn.png", "wb.png", "wq.png", "wk.png"]

var bImgs = []
for(i=0; i<6;i++){
    bImgs.push(new Image())
}
[bImgs[0].src, bImgs[1].src,bImgs[2].src,bImgs[3].src,bImgs[4].src,bImgs[5].src] = ["bp.png", "br.png", "bkn.png", "bb.png", "bq.png", "bk.png"]

//tracker museposisjonen
var pX = 0
var pY = 0
window.onmousemove = function(e){
    px = Math.floor((e.clientX - w*0.1 - w*0.8*0.1 - (w*0.8*0.8-canvas.width)/2 - canvas.width*0.034)/(canvas.width-canvas.width*0.068)*8)
    py = Math.floor((e.clientY - h*0.05 - canvas.height*0.034)/(canvas.height-canvas.height*0.068)*8)
    pX = e.clientX - w*0.1 - w*0.8*0.1 - (w*0.8*0.8-canvas.width)/2 - canvas.width*0.034
    pY = e.clientY - h*0.05 - canvas.height*0.034
}

//tegner brettet
function animate(position=board){
    for(i=0;i<board.length;i++){
        for(j=0;j<board.length;j++){
            if(position[i][j]>0){
                c.drawImage(wImgs[wPieces[position[i][j]-1].img],0.034*canvas.width+j*(canvas.width-canvas.width*0.068)/8,0.034*canvas.width+i*(canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
            }
            if(position[i][j]<0){
                c.drawImage(bImgs[bPieces[-position[i][j]-1].img],0.034*canvas.width+j*(canvas.width-canvas.width*0.068)/8,0.034*canvas.width+i*(canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
            }
        }
    }
}

var bCaptured = 0
var wCaptured = 0
function drawCaptured(c, i){
    if(c=="white"){
        bC.drawImage(wImgs[i],w*0.1*0.8/2-(h/15)/2,(h/15)*wCaptured,h/15,h/15)
        wCaptured++
    }
    if(c=="black"){
        wC.drawImage(bImgs[i],w*0.1*0.8/2-(h/15)/2,(h/15)*bCaptured,h/15,h/15)
        bCaptured++
    }
}

//laster inn bilder og animerer brettet når vinduet laster
var boardImg = new Image()
boardImg.src="board3.jpg"
var bGround = new Image()
bGround.src="background2.jpg"
window.onload = function(){
    c.drawImage(boardImg,0,0,canvas.width,canvas.height)
    ba.drawImage(bGround,0,0,0.64*w,0.9*h)
    animate()
}

var name1 = "Player 1"
var name2 = "Player 2"
player1.onchange = function(){
    name1 = player1.value
    fillSelect()
    fillNames()
}
player2.onchange = function(){
    name2 = player2.value
    fillSelect()
    fillNames()
}
function fillSelect(){
    select.innerHTML = ""
    select.innerHTML+=`<option>${name1}</option>`
    select.innerHTML+=`<option>${name2}</option>`
}
var wPlayer = "Player 1"
var bPlayer = "Player 2"
select.addEventListener("change", fillNames)

var gameNotStarted = true
function fillNames(){
    if(gameNotStarted){
        if(select.selectedIndex==0){
            wPlayer = select[0].value
            bPlayer = select[1].value
        }
        else{
            wPlayer = select[1].value
            bPlayer = select[0].value
        }
    }
    wName.innerHTML = wPlayer
    bName.innerHTML = bPlayer
}

//starter spill og klokke
var tileSelected = false
var selectedTile = [0,0]
var turn = "white"
start.addEventListener("click", startGame)
function startGame(){
    gameNotStarted = false
    start.style.display = "none"
    canvas.addEventListener("click", click)
    player1.disabled = true
    player2.disabled = true
    select.disabled = true
    timeEl.disabled = true
    incrementEl.disabled = true
    select.style.cursor = "inherit"
    setTimeout(clock,1000)
}

//oppdaterer klokken
var time = [300, 300]
var increment = 5
wTime.innerHTML = timeCalc(time[0])
bTime.innerHTML = timeCalc(time[1])
function clock(){
    if(turn=="white"){
        time[0]--
        wTime.innerHTML = timeCalc(time[0])
        if(time[0]==0){
            end("black")
            return
        }
    }
    if(turn=="black"){
        time[1]--
        bTime.innerHTML = timeCalc(time[1])
        if(time[1]==0){
            end("white")
            return
        }
    }
    if(playing){
        setTimeout(clock, 1000)
    }
}

//Gjør om antall sekunder til formatet mm:ss
function timeCalc(t){
    var m = ""
    var s = ""
    if(Math.floor(t/60).toString().length<2){
        m = "0" + Math.floor(t/60).toString()
    }
    else{
        m = Math.floor(t/60).toString()
    }
    if((t%60).toString().length<2){
        s = "0" + (t%60).toString()
    }
    else{
        s = (t%60).toString()
    }
    return `${m}:${s}`
    
}

timeEl.addEventListener("change", setClock)
function setClock(){
    time = [Number(timeEl.value), Number(timeEl.value)]
    wTime.innerHTML = timeCalc(time[0])
    bTime.innerHTML = timeCalc(time[1])
}

incrementEl.onchange = function(){
    increment = Number(incrementEl.value)
}
wResign.onclick = function(){
    end("black")
}
bResign.onclick = function(){
    end("white")
}
var draw = [false, false]
wDraw.onclick = function(){
    checkDraw(0)
}
bDraw.onclick = function(){
    checkDraw(1)
}
function checkDraw(a){
    draw[a] = !draw[a]
    if(draw[0] && draw[1]){
        end(draw)
    }
    if(a==0){
        if(!draw[0]){
            wDraw.innerHTML = "Offer Draw"
        }
        else{
            wDraw.innerHTML = "Retract Offer"
        }
    }
    if(a==1){
        if(!draw[1]){
            bDraw.innerHTML = "Offer Draw"
        }
        else{
            bDraw.innerHTML = "Retract Offer"
        }
    }
}
//viser hvem som vant spillet
var playing = true
var score = [0,0]
function end(w){
    playing = false
    if(w=="black"){
        blackClock.style.backgroundColor = "green"
        whiteClock.style.backgroundColor = "red"
        winner.style.backgroundColor = "black"
        winner.style.color = "white"
        winner.innerHTML = `${bPlayer} won!`
        score[1]++
    }
    else if(w=="white"){
        blackClock.style.backgroundColor = "red"
        whiteClock.style.backgroundColor = "green"
        winner.style.backgroundColor = "white"
        winner.style.color = "black"
        winner.innerHTML = `${wPlayer} won!`
        score[0]++
    }
    else{
        blackClock.style.backgroundColor = "yellow"
        whiteClock.style.backgroundColor = "yellow"
        winner.style.backgroundColor = "lightgray"
        winner.style.color = "gray"
        winner.innerHTML = `It's a draw!`
        score[0]+=0.5
        score[1]+=0.5
    }
    newGame.style.display = "block"
    drawScore()
    canvas.removeEventListener("click", click)
    setTimeout(end2, 1000)
}

function drawScore(){
    bScore.innerHTML = `${score[1]} - ${score[0]}`
    wScore.innerHTML = `${score[0]} - ${score[1]}`
}

function end2(){
    winner.style.top = `${h/2-62}px`
    wrapper.classList.add("blurred") 
    left.classList.add("blurred")
    right.classList.add("blurred")
    newGame.style.opacity = 1
}

newGame.onclick = function(){
    setup()
    playing = true
    newGame.style.display = "none"
    newGame.style.opacity = 0
    winner.style.top = `${-124}px`
    var t = bPlayer
    bPlayer = wPlayer
    wPlayer = t
    score = score.reverse()
    fillNames()
    drawScore()
    wrapper.classList.remove("blurred")
    left.classList.remove("blurred")
    right.classList.remove("blurred")
    blackClock.style.backgroundColor = "#313329"
    whiteClock.style.backgroundColor = "#313329"
    setClock()
    c.clearRect(0,0,w,h)
    c.drawImage(boardImg,0,0,canvas.width,canvas.height)
    animate()
    canvas.addEventListener("click", click)
    turn = "white"
    bCaptured = 0
    wCaptured = 0
    bC.clearRect(0,0,w*0.8*0.1,h)
    wC.clearRect(0,0,w*0.8*0.1,h)
    tileSelected = false
    last = []
    bKing = 4
    wKing = 60
    draw = [false, false]
    wDraw.innerHTML = "Offer Draw"
    bDraw.innerHTML = "Offer Draw"
    blackMaterial = 39
    whiteMaterial = 39
    calcDifference()
    filterPossible()
    setTimeout(clock, 1000)
}

//sjekker om en brikke er valgt eller ikke når det trykkes på brettet, for deretter å enten sende videre til funksjoner for å velge brikke/trekk
function click(){
    if(!tileSelected){
        pickPiece()
    }
    else{
        pickMove()
    }
}

//finner alle mulige trekk gitt en posisjon og en brikke
function getPossible(selectedTile, t, position){
            var x = selectedTile[0]
            var y = selectedTile[1]
            var id = position[y][x]
            var p = []
            if(t=="white"){
                if(id>0){

                    if(wPieces[id-1].type=="p"){
                        if(y==6){
                            if(position[4][x]==0 && position[5][x]==0){
                                p.push(4*8+x)
                            }
                        }
                        if(position[y-1][x]==0){
                            p.push((y-1)*8+x)
                        }
                        if(x>0){
                            if(position[y-1][x-1]<0){
                                p.push((y-1)*8+x-1)
                            }
                        }
                        if(x<7){
                            if(position[y-1][x+1]<0){
                                p.push((y-1)*8+x+1)
                            }
                        }
                        if(y==3){
                            if(x<7){
                                if(bPieces[x+1].doubleMove==turncount/2-1){
                                    p.push((y-1)*8+x+1)
                                }
                            }
                            if(x>0){
                                if(bPieces[x-1].doubleMove==turncount/2-1){
                                    p.push((y-1)*8+x-1)
                                }
                            }
                        }
                    }

                    if(wPieces[id-1].type=="r"){
                        for(z=x+1; z<position.length; z++){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]>0){
                                break
                            }
                            if(position[y][z]<0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=x-1; z>=0; z--){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]>0){
                                break
                            }
                            if(position[y][z]<0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=y+1; z<position.length; z++){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]>0){
                                break
                            }
                            if(position[z][x]<0){
                                p.push(z*8+x)
                                break
                            }
                        }
                        for(z=y-1; z>=0; z--){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]>0){
                                break
                            }
                            if(position[z][x]<0){
                                p.push(z*8+x)
                                break
                            }
                        }
                    }
                    
                    if(wPieces[id-1].type=="n"){
                        if(x>1){
                            if(y<7){
                                if(position[y+1][x-2]<=0){
                                    p.push((y+1)*8+x-2)
                                }
                            }
                            if(y>0){
                                if(position[y-1][x-2]<=0){
                                    p.push((y-1)*8+x-2)
                                }
                            }
                        }
                        if(x>0){
                            if(y<6){
                                if(position[y+2][x-1]<=0){
                                    p.push((y+2)*8+x-1)
                                }
                            }
                            if(y>1){
                                if(position[y-2][x-1]<=0){
                                    p.push((y-2)*8+x-1)
                                }
                            }
                        }
                        if(x<6){
                            if(y<7){
                                if(position[y+1][x+2]<=0){
                                    p.push((y+1)*8+x+2)
                                }
                            }
                            if(y>0){
                                if(position[y-1][x+2]<=0){
                                    p.push((y-1)*8+x+2)
                                }
                            }
                        }
                        if(x<7){
                            if(y<6){
                                if(position[y+2][x+1]<=0){
                                    p.push((y+2)*8+x+1)
                                }
                            }
                            if(y>1){
                                if(position[y-2][x+1]<=0){
                                    p.push((y-2)*8+x+1)
                                }
                            }
                        }
                    }

                    if(wPieces[id-1].type=="b"){
                        var ne = true
                        var nw = true
                        var sw = true
                        var se = true
                        for(z=1; z<position.length; z++){
                            if(x+z<position.length){
                                if(y-z>=0){
                                    if(ne){
                                        if(position[y-z][x+z]==0){
                                            p.push((y-z)*8+x+z)
                                        }
                                        if(position[y-z][x+z]<0){
                                            p.push((y-z)*8+x+z)
                                            ne = false
                                        }
                                        if(position[y-z][x+z]>0){
                                            ne = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(se){
                                        if(position[y+z][x+z]==0){
                                            p.push((y+z)*8+x+z)
                                        }
                                        if(position[y+z][x+z]<0){
                                            p.push((y+z)*8+x+z)
                                            se = false
                                        }
                                        if(position[y+z][x+z]>0){
                                            se = false
                                        }
                                    }
                                }
                            }
                            if(x-z>=0){
                                if(y-z>=0){
                                    if(nw){
                                        if(position[y-z][x-z]==0){
                                            p.push((y-z)*8+x-z)
                                        }
                                        if(position[y-z][x-z]<0){
                                            p.push((y-z)*8+x-z)
                                            nw = false
                                        }
                                        if(position[y-z][x-z]>0){
                                            nw = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(sw){
                                        if(position[y+z][x-z]==0){
                                            p.push((y+z)*8+x-z)
                                        }
                                        if(position[y+z][x-z]<0){
                                            p.push((y+z)*8+x-z)
                                            sw = false
                                        }
                                        if(position[y+z][x-z]>0){
                                            sw = false
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(wPieces[id-1].type=="k"){
                        if(x>0){
                            if(position[y][x-1]<=0){
                                p.push(y*8+x-1)
                            }
                            if(y>0){
                                if(position[y-1][x-1]<=0){
                                    p.push((y-1)*8+x-1)
                                }
                            }
                            if(y<7){
                                if(position[y+1][x-1]<=0){
                                    p.push((y+1)*8+x-1)
                                }
                            }
                        }
                        if(x<7){
                            if(position[y][x+1]<=0){
                                p.push(y*8+x+1)
                            }
                            if(y>0){
                                if(position[y-1][x+1]<=0){
                                    p.push((y-1)*8+x+1)
                                }
                            }
                            if(y<7){
                                if(position[y+1][x+1]<=0){
                                    p.push((y+1)*8+x+1)
                                }
                            }
                        }
                        if(y>0){
                            if(position[y-1][x]<=0){
                                p.push((y-1)*8+x)
                            }
                        }
                        if(y<7){
                            if(position[y+1][x]<=0)
                            p.push((y+1)*8+x)
                        }
                        if(!wPieces[8].moved && !wPieces[12].moved){
                            if(position[7][1]==0 && position[7][2]==0 && position[7][3]==0){
                                p.push(7*8+2)
                            }
                        }
                        if(!wPieces[15].moved && !wPieces[12].moved){
                            if(position[7][6]==0 && position[7][5]==0){
                                p.push(7*8+6)
                            }
                        }
                    }

                    if(wPieces[id-1].type=="q"){
                        for(z=x+1; z<position.length; z++){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]>0){
                                break
                            }
                            if(position[y][z]<0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=x-1; z>=0; z--){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]>0){
                                break
                            }
                            if(position[y][z]<0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=y+1; z<position.length; z++){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]>0){
                                break
                            }
                            if(position[z][x]<0){
                                p.push(z*8+x)
                                break
                            }
                        }
                        for(z=y-1; z>=0; z--){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]>0){
                                break
                            }
                            if(position[z][x]<0){
                                p.push(z*8+x)
                                break
                            }
                        }
                        var ne = true
                        var nw = true
                        var sw = true
                        var se = true
                        for(z=1; z<position.length; z++){
                            if(x+z<position.length){
                                if(y-z>=0){
                                    if(ne){
                                        if(position[y-z][x+z]==0){
                                            p.push((y-z)*8+x+z)
                                        }
                                        if(position[y-z][x+z]<0){
                                            p.push((y-z)*8+x+z)
                                            ne = false
                                        }
                                        if(position[y-z][x+z]>0){
                                            ne = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(se){
                                        if(position[y+z][x+z]==0){
                                            p.push((y+z)*8+x+z)
                                        }
                                        if(position[y+z][x+z]<0){
                                            p.push((y+z)*8+x+z)
                                            se = false
                                        }
                                        if(position[y+z][x+z]>0){
                                            se = false
                                        }
                                    }
                                }
                            }
                            if(x-z>=0){
                                if(y-z>=0){
                                    if(nw){
                                        if(position[y-z][x-z]==0){
                                            p.push((y-z)*8+x-z)
                                        }
                                        if(position[y-z][x-z]<0){
                                            p.push((y-z)*8+x-z)
                                            nw = false
                                        }
                                        if(position[y-z][x-z]>0){
                                            nw = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(sw){
                                        if(position[y+z][x-z]==0){
                                            p.push((y+z)*8+x-z)
                                        }
                                        if(position[y+z][x-z]<0){
                                            p.push((y+z)*8+x-z)
                                            sw = false
                                        }
                                        if(position[y+z][x-z]>0){
                                            sw = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                wPieces[Math.abs(id)-1].moves = p
            }

            if(t=="black"){

                if(id<0){
                    id = -id
                    if(bPieces[id-1].type=="p"){
                        if(y==1){
                            if(position[2][x]==0 && position[3][x]==0){
                                p.push(3*8+x)
                            }
                        }
                        if(position[y+1][x]==0){
                            p.push((y+1)*8+x)
                        }
                        if(x>0){
                            if(position[y+1][x-1]>0){
                                p.push((y+1)*8+x-1)
                            }
                        }
                        if(x<7){
                            if(position[y+1][x+1]>0){
                                p.push((y+1)*8+x+1)
                            }
                        }
                        if(y==4){
                            if(x<7){
                                if(wPieces[x+1].doubleMove==(turncount-1)/2){
                                    p.push((y+1)*8+x+1)
                                }
                            }
                            if(x>0){
                                if(wPieces[x-1].doubleMove==(turncount-1)/2){
                                    p.push((y+1)*8+x-1)
                                }
                            }
                        }
                    }

                    if(bPieces[id-1].type=="r"){
                        for(z=x+1; z<position.length; z++){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]<0){
                                break
                            }
                            if(position[y][z]>0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=x-1; z>=0; z--){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]<0){
                                break
                            }
                            if(position[y][z]>0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=y+1; z<position.length; z++){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]<0){
                                break
                            }
                            if(position[z][x]>0){
                                p.push(z*8+x)
                                break
                            }
                        }
                        for(z=y-1; z>=0; z--){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]<0){
                                break
                            }
                            if(position[z][x]>0){
                                p.push(z*8+x)
                                break
                            }
                        }
                    }
                    
                    if(bPieces[id-1].type=="n"){
                        if(x>1){
                            if(y<7){
                                if(position[y+1][x-2]>=0){
                                    p.push((y+1)*8+x-2)
                                }
                            }
                            if(y>0){
                                if(position[y-1][x-2]>=0){
                                    p.push((y-1)*8+x-2)
                                }
                            }
                        }
                        if(x>0){
                            if(y<6){
                                if(position[y+2][x-1]>=0){
                                    p.push((y+2)*8+x-1)
                                }
                            }
                            if(y>1){
                                if(position[y-2][x-1]>=0){
                                    p.push((y-2)*8+x-1)
                                }
                            }
                        }
                        if(x<6){
                            if(y<7){
                                if(position[y+1][x+2]>=0){
                                    p.push((y+1)*8+x+2)
                                }
                            }
                            if(y>0){
                                if(position[y-1][x+2]>=0){
                                    p.push((y-1)*8+x+2)
                                }
                            }
                        }
                        if(x<7){
                            if(y<6){
                                if(position[y+2][x+1]>=0){
                                    p.push((y+2)*8+x+1)
                                }
                            }
                            if(y>1){
                                if(position[y-2][x+1]>=0){
                                    p.push((y-2)*8+x+1)
                                }
                            }
                        }
                    }

                    if(bPieces[id-1].type=="b"){
                        var ne = true
                        var nw = true
                        var sw = true
                        var se = true
                        for(z=1; z<position.length; z++){
                            if(x+z<position.length){
                                if(y-z>=0){
                                    if(ne){
                                        if(position[y-z][x+z]==0){
                                            p.push((y-z)*8+x+z)
                                        }
                                        if(position[y-z][x+z]>0){
                                            p.push((y-z)*8+x+z)
                                            ne = false
                                        }
                                        if(position[y-z][x+z]<0){
                                            ne = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(se){
                                        if(position[y+z][x+z]==0){
                                            p.push((y+z)*8+x+z)
                                        }
                                        if(position[y+z][x+z]>0){
                                            p.push((y+z)*8+x+z)
                                            se = false
                                        }
                                        if(position[y+z][x+z]<0){
                                            se = false
                                        }
                                    }
                                }
                            }
                            if(x-z>=0){
                                if(y-z>=0){
                                    if(nw){
                                        if(position[y-z][x-z]==0){
                                            p.push((y-z)*8+x-z)
                                        }
                                        if(position[y-z][x-z]>0){
                                            p.push((y-z)*8+x-z)
                                            nw = false
                                        }
                                        if(position[y-z][x-z]<0){
                                            nw = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(sw){
                                        if(position[y+z][x-z]==0){
                                            p.push((y+z)*8+x-z)
                                        }
                                        if(position[y+z][x-z]>0){
                                            p.push((y+z)*8+x-z)
                                            sw = false
                                        }
                                        if(position[y+z][x-z]<0){
                                            sw = false
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(bPieces[id-1].type=="k"){
                        if(x>0){
                            if(position[y][x-1]>=0){
                                p.push(y*8+x-1)
                            }
                            if(y>0){
                                if(position[y-1][x-1]>=0){
                                    p.push((y-1)*8+x-1)
                                }
                            }
                            if(y<7){
                                if(position[y+1][x-1]>=0){
                                    p.push((y+1)*8+x-1)
                                }
                            }
                        }
                        if(x<7){
                            if(position[y][x+1]>=0){
                                p.push(y*8+x+1)
                            }
                            if(y>0){
                                if(position[y-1][x+1]>=0){
                                    p.push((y-1)*8+x+1)
                                }
                            }
                            if(y<7){
                                if(position[y+1][x+1]>=0){
                                    p.push((y+1)*8+x+1)
                                }
                            }
                        }
                        if(y>0){
                            if(position[y-1][x]>=0){
                                p.push((y-1)*8+x)
                            }
                        }
                        if(y<7){
                            if(position[y+1][x]>=0)
                            p.push((y+1)*8+x)
                        }
                        if(!bPieces[8].moved && !bPieces[12].moved){
                            if(position[0][1]==0 && position[0][2]==0 && position[0][3]==0){
                                p.push(2)
                            }
                        }
                        if(!bPieces[15].moved && !bPieces[12].moved){
                            if(position[0][6]==0 && position[0][5]==0){
                                p.push(6)
                            }
                        }
                    }

                    if(bPieces[id-1].type=="q"){
                        for(z=x+1; z<position.length; z++){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]<0){
                                break
                            }
                            if(position[y][z]>0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=x-1; z>=0; z--){
                            if(position[y][z]==0){
                                p.push(y*8+z)
                            }
                            if(position[y][z]<0){
                                break
                            }
                            if(position[y][z]>0){
                                p.push(y*8+z)
                                break
                            }
                        }
                        for(z=y+1; z<position.length; z++){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]<0){
                                break
                            }
                            if(position[z][x]>0){
                                p.push(z*8+x)
                                break
                            }
                        }
                        for(z=y-1; z>=0; z--){
                            if(position[z][x]==0){
                                p.push(z*8+x)
                            }
                            if(position[z][x]<0){
                                break
                            }
                            if(position[z][x]>0){
                                p.push(z*8+x)
                                break
                            }
                        }
                        var ne = true
                        var nw = true
                        var sw = true
                        var se = true
                        for(z=1; z<position.length; z++){
                            if(x+z<position.length){
                                if(y-z>=0){
                                    if(ne){
                                        if(position[y-z][x+z]==0){
                                            p.push((y-z)*8+x+z)
                                        }
                                        if(position[y-z][x+z]>0){
                                            p.push((y-z)*8+x+z)
                                            ne = false
                                        }
                                        if(position[y-z][x+z]<0){
                                            ne = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(se){
                                        if(position[y+z][x+z]==0){
                                            p.push((y+z)*8+x+z)
                                        }
                                        if(position[y+z][x+z]>0){
                                            p.push((y+z)*8+x+z)
                                            se = false
                                        }
                                        if(position[y+z][x+z]<0){
                                            se = false
                                        }
                                    }
                                }
                            }
                            if(x-z>=0){
                                if(y-z>=0){
                                    if(nw){
                                        if(position[y-z][x-z]==0){
                                            p.push((y-z)*8+x-z)
                                        }
                                        if(position[y-z][x-z]>0){
                                            p.push((y-z)*8+x-z)
                                            nw = false
                                        }
                                        if(position[y-z][x-z]<0){
                                            nw = false
                                        }
                                    }
                                }
                                if(y+z<position.length){
                                    if(sw){
                                        if(position[y+z][x-z]==0){
                                            p.push((y+z)*8+x-z)
                                        }
                                        if(position[y+z][x-z]>0){
                                            p.push((y+z)*8+x-z)
                                            sw = false
                                        }
                                        if(position[y+z][x-z]<0){
                                            sw = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                bPieces[id-1].moves = p
            }
            return p
}
function filterPossible(){
    var legalPick = false
    var ksc = false
    var qsc = false
    if(turn=="white"){
        var totalMoves = 0
        for(a=0; a<8; a++){
            for(b=0; b<8; b++){
                if(board[b][a]>0){
                    legalPick = true
                    getPossible([a, b], turn, board)
                    var legalMoves = JSON.parse(JSON.stringify(wPieces[Math.abs(board[b][a])-1].moves))
                    for(i=0; i<wPieces[board[b][a]-1].moves.length; i++){
                        wKing = lastWKing
                        if(wPieces[Math.abs(board[b][a])-1].type=="k"){
                            wKing = wPieces[Math.abs(board[b][a])-1].moves[i]
                            if(!wPieces[12].moved){
                                if(wPieces[12].moves[i]==58){
                                    qsc = true
                                }
                                if(wPieces[12].moves[i]==62){
                                    ksc = true
                                }
                            }
                        }
                        var boardCopy = copyBoard(a, b, board[b][a], wPieces[board[b][a]-1].moves[i])
                        var allPossible = []
                        for(j=0;j<board.length; j++){
                            for(k=0; k<board.length; k++){
                                if(board[j][k]<0){
                                    allPossible = allPossible.concat(getPossible([k,j], "black", boardCopy))
                                }
                            }
                        }
                        for(j=0; j<allPossible.length; j++){
                            if(allPossible[j]==wKing){
                                legalMoves.splice(legalMoves.indexOf(wPieces[Math.abs(board[b][a])-1].moves[i]), 1)
                                break
                            }
                            if(qsc){
                                if(allPossible[j]==wqsc[0] || allPossible[j]==wqsc[1] || allPossible[j]==wqsc[2]){
                                    legalMoves.splice(legalMoves.indexOf(wPieces[Math.abs(board[b][a])-1].moves[i]), 1)
                                }
                            }
                            if(ksc){
                                if(allPossible[j]==wksc[0] || allPossible[j]==wksc[1] || allPossible[j]==wksc[2]){
                                    legalMoves.splice(legalMoves.indexOf(wPieces[Math.abs(board[b][a])-1].moves[i]), 1)
                                }
                            }
                        }
                    }
                    wPieces[Math.abs(board[b][a])-1].moves = legalMoves
                    totalMoves+=legalMoves.length
                }
            }
        }
        if(totalMoves==0){
            staleOrMate()
        }
    }
    if(turn=="black"){
        var totalMoves = 0
        for(a=0; a<8; a++){
            for(b=0; b<8; b++){
                if(board[b][a]<0){
                    legalPick = true
                    getPossible([a,b], turn, board)
                    var legalMoves = JSON.parse(JSON.stringify(bPieces[Math.abs(board[b][a])-1].moves))
                    for(i=0; i<bPieces[Math.abs(board[b][a])-1].moves.length; i++){
                        bKing = lastBKing
                        if(bPieces[Math.abs(board[b][a])-1].type=="k"){
                            bKing = bPieces[Math.abs(board[b][a])-1].moves[i]
                            if(!bPieces[12].moved){
                                if(bPieces[12].moves[i]==2){
                                    qsc = true
                                }
                                if(bPieces[12].moves[i]==6){
                                    ksc = true
                                }
                            }
                        }
                        var boardCopy = copyBoard(a, b, board[b][a], bPieces[Math.abs(board[b][a])-1].moves[i])
                        var allPossible = []
                        for(j=0;j<board.length; j++){
                            for(k=0; k<board.length; k++){
                                if(board[j][k]>0){
                                    allPossible = allPossible.concat(getPossible([k,j], turns[(turncount+1)%2], boardCopy))
                                }
                            }
                        }
                        for(j=0; j<allPossible.length; j++){
                            if(allPossible[j]==bKing){
                                legalMoves.splice(legalMoves.indexOf(bPieces[Math.abs(board[b][a])-1].moves[i]), 1)
                                break
                            }
                            if(qsc){
                                if(allPossible[j]==bqsc[0] || allPossible[j]==bqsc[1] || allPossible[j]==bqsc[2]){
                                    legalMoves.splice(legalMoves.indexOf(bPieces[Math.abs(board[b][a])-1].moves[i]), 1)
                                }
                            }
                            if(ksc){
                                if(allPossible[j]==bksc[0] || allPossible[j]==bksc[1] || allPossible[j]==bksc[2]){
                                    legalMoves.splice(legalMoves.indexOf(bPieces[Math.abs(board[b][a])-1].moves[i]), 1)
                                }
                            }
                        }
                    }
                    bPieces[Math.abs(board[b][a])-1].moves = legalMoves
                    totalMoves+=legalMoves.length
                }
            }
        }
        if(totalMoves==0){
            staleOrMate()
        }
    }
}
filterPossible()
//lager et todimansjonalt array som inneholder alle de lovlige trekkene (brukes til å animere muligheter)
var movesMap = []
function newMovesMap(id){
    movesMap = []
    for(i=0; i<8; i++){
        var t = []
        for(j=0; j<8; j++){
            t.push(false)
        }
        movesMap.push(t)
    }
    if(turn=="white"){
        for(i=0; i<wPieces[id].moves.length; i++){
            movesMap[Math.floor(wPieces[id].moves[i]/8)][wPieces[id].moves[i]%8]=true
        } 
    }
    if(turn=="black"){
        for(i=0; i<bPieces[id].moves.length; i++){
            movesMap[Math.floor(bPieces[id].moves[i]/8)][bPieces[id].moves[i]%8]=true
        } 
    }
}

//lager en kopi av brettet der en brikke er flyttet 
function copyBoard(x,y,v,n){
    var copy = JSON.parse(JSON.stringify(board))
    copy[Math.floor(n/8)][n%8] = v
    copy[y][x] = 0
    return copy
}

//bruker getPossible for å finne alle de lovlige trekkene, altså vil man ikke kunne flytte brikker slik at kongen blir stående i sjakk etter trekket
var turns = ["white", "black"]
var wKing = 60
var lastWKing = 60
var bKing = 4
var lastBKing = 4
var selectedPiece = []
var wksc = [60,61,62]
var wqsc = [58,59,60]
var bksc = [4,5,6]
var bqsc = [2,3,4]
var PX = 0
var PY = 0
var boardCopy = []
function pickPiece(){
    console.log("pick")
    console.log(wKing, bKing)
    if((turn=="white" && board[py][px]>0) || (turn=="black" && board[py][px]<0)){
        selectedPiece = [board[py][px], py*8+px]
        newMovesMap(Math.abs(board[py][px])-1)
        c.clearRect(0,0,w,h)
        animateOptions()
        boardCopy = JSON.parse(JSON.stringify(board))
        boardCopy[py][px] = 0
        animate(boardCopy)
        PX = px
        PY = py
        tileSelected = true
        dragPiece()
        window.addEventListener("keydown", cancelChoise)
    }
}
function dragPiece(){
    // console.log(PX, PY)
    c.clearRect(0,0,w,h)
    c.drawImage(boardImg,0,0,canvas.width,canvas.height)
    drawMoves()
    if(!tileSelected){
        animate()
        return
    }
    animateOptions()
    animate(boardCopy)
    if(turn=="white"){
        c.drawImage(wImgs[wPieces[board[PY][PX]-1].img], pX, pY, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
    }
    if(turn=="black"){
        console.log(PX,PY, tileSelected, turn)
        c.drawImage(bImgs[bPieces[Math.abs(board[PY][PX])-1].img], pX, pY, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
    }
    window.requestAnimationFrame(dragPiece)
}

function staleOrMate(){
    console.log(1)
    var mate = false
    bKing = lastBKing
    wKing = lastWKing
    console.log(bKing)
    for(i=0; i<8; i++){
        for(j=0; j<8; j++){
            if(turn=="white"){
                if(board[i][j]<0){
                    allPossible = getPossible([j,i], "black", board)
                    console.log(allPossible)
                    for(k=0; k<allPossible.length; k++){
                        if(allPossible[k]==wKing){
                            mate = true
                            break
                        }
                    }
                }
            }
            if(turn=="black"){
                if(board[i][j]>0){
                    allPossible = getPossible([j,i], "white", board)
                    console.log(j,i,allPossible)
                    for(k=0; k<allPossible.length; k++){
                        if(allPossible[k]==bKing){
                            mate = true
                            break
                        }
                    }
                }
            }
            if(mate){
                break
            }
        }
        if(mate){
            break
        }
    }
    if(mate){
        console.log("mate")
        end(turns[(turncount+1)%2])
    }
    else{
        end("draw")
    }
}

//avbryter valg av brikke med escape-nappen
function cancelChoise(e){
    if(e.keyCode==27){
        tileSelected = false
        c.clearRect(0,0,w,h)
        c.drawImage(boardImg,0,0,canvas.width,canvas.height)
        drawMoves(false)
        animate()
        window.removeEventListener("keydown", cancelChoise)
    }
}

//sjekker om det valgte trekket er blant de lovlige
function pickMove(){
    window.cancelAnimationFrame(dragPiece)
    if(turn=="white"){
        for(i=0; i<wPieces[selectedPiece[0]-1].moves.length; i++){
            if(py*8+px==wPieces[selectedPiece[0]-1].moves[i]){
                movePiece()
                time[0]+=increment
                wTime.innerHTML = timeCalc(time[0])
                tileSelected = false
                return
            }
        }
    }
    if(turn=="black"){
        for(i=0; i<bPieces[Math.abs(selectedPiece[0])-1].moves.length; i++){
            if(py*8+px==bPieces[Math.abs(selectedPiece[0])-1].moves[i]){
                movePiece()
                time[1]+=increment
                bTime.innerHTML = timeCalc(time[1])
                tileSelected = false
                return
            }
        }
    }
}

//manipulerer brettet for å utføre trekket og tegner den nye posisjoenen
var blackMaterial = 1*8 + 2*3 + 2*3 + 2*5 + 9
var whiteMaterial = 1*8 + 2*3 + 2*3 + 2*5 + 9
var material = [1,5,3,3,9]
var rows = [8,7,6,5,4,3,2,1]
var colums = ["a","b","c","d","e","f","g","h"]
var pNames = ["", "R", "N", "B", "Q", "K"]
var moveList = []
function movePiece(){
    //oppdaterer konge og utfører rokkade
    var queening = false
    var length = moveList.length
    if(selectedPiece[0]==13){
        wKing = py*8+px
        if(!wPieces[12].moved){
            if(px==6){
                board[7][5] = board[7][7]
                board[7][7] = 0
                moveList.push("0-0")
            }
            if(px==2){
                board[7][3] = board[7][0]
                board[7][0] = 0
                moveList.push("0-0-0")
            }
        }
    }
    if(selectedPiece[0]==-13){
        bKing = py*8+px
        if(!bPieces[12].moved){
            if(px==6){
                board[0][5] = board[0][7]
                board[0][7] = 0
                moveList.push("0-0")
            }
            if(px==2){
                board[0][3] = board[0][0]
                board[0][0] = 0
                moveList.push("0-0-0")
            }
        }
    }
    //ny dronnig
    if(selectedPiece[0]>0 && selectedPiece[0]<9){
        if(py==0){
            wPieces[selectedPiece[0]-1].type = "q"
            wPieces[selectedPiece[0]-1].img = 4
            whiteMaterial+=8
            moveList.push(`${colums[px]}8Q`)
            queening = true
        }
        if(!wPieces[selectedPiece[0]-1].moved && py==4){
            wPieces[selectedPiece[0]-1].doubleMove = turncount/2
        }
    }
    if(selectedPiece[0]>-9 && selectedPiece[0]<0){
        if(py==7){
            bPieces[Math.abs(selectedPiece[0])-1].type = "q"
            bPieces[Math.abs(selectedPiece[0])-1].img = 4
            blackMaterial+=8
            moveList.push(`${colums[px]}1Q`)
            queening = true
        }
        if(!bPieces[Math.abs(selectedPiece[0])-1].moved && py==3){
            bPieces[Math.abs(selectedPiece[0])-1].doubleMove = (turncount-1)/2
        }
    }
    // en passant
    if(py==5){
        if((turncount-1)/2==wPieces[px].doubleMove){
            if(selectedPiece[0]>-9 && selectedPiece[0]<0){
                board[4][px] = 0
                wPieces[px].moves = []
                whiteMaterial-=1
                moveList.push(`${colums[selectedPiece[1]%8]}x${colums[px]}${rows[py]}e.p.`)
            }
        }
    }
    if(py==2){
        if(turncount/2-1==bPieces[px].doubleMove){
            if(selectedPiece[0]<9 && selectedPiece[0]>0){
                board[3][px] = 0
                bPieces[px].moves = []
                blackMaterial-=1
                moveList.push(`${colums[selectedPiece[1]%8]}x${colums[px]}${rows[py]}e.p.`)
            }
        }
    }
    //registerer at brikke har blitt flyttet 
    if(selectedPiece[0]>0){
        wPieces[selectedPiece[0]-1].moved = true
    }
    else{
        bPieces[Math.abs(selectedPiece[0])-1].moved = true
    }
    //fjerner gyldige trekk og oppdaterer material dersom en brikke forsvinner
    if(board[py][px]>0){
        wPieces[Math.abs(board[py][px])-1].moves = []
        whiteMaterial-=material[wPieces[Math.abs(board[py][px])-1].img]
        drawCaptured("white", wPieces[Math.abs(board[py][px])-1].img)
        calcDifference()
        console.log(bPieces[Math.abs(selectedPiece[0])-1].type)
        if(bPieces[Math.abs(selectedPiece[0])-1].type!="p"){
            if(queening){
                moveList.pop()
                moveList.push(`${colums[selectedPiece[1]%8]}x${colums[px]}${rows[py]}Q`)
            }
            else{
                moveList.push(`${pNames[bPieces[Math.abs(selectedPiece[0])-1].img]}x${colums[px]}${rows[py]}`)
            }
        }
        else{
            moveList.push(`${colums[selectedPiece[1]%8]}${pNames[bPieces[Math.abs(selectedPiece[0])-1].img]}x${colums[px]}${rows[py]}`)
        }
    }
    if(board[py][px]<0){
        bPieces[Math.abs(board[py][px])-1].moves = []
        blackMaterial-=material[bPieces[Math.abs(board[py][px])-1].img]
        drawCaptured("black", bPieces[Math.abs(board[py][px])-1].img)
        calcDifference()
        if(wPieces[Math.abs(selectedPiece[0])-1].type!="p"){
            if(queening){
                moveList.pop()
                moveList.push(`${colums[selectedPiece[1]%8]}x${colums[px]}${rows[py]}Q`)
            }
            else{
                moveList.push(`${pNames[bPieces[Math.abs(selectedPiece[0])-1].img]}x${colums[px]}${rows[py]}`)
            }
        }
        else{
            moveList.push(`${colums[selectedPiece[1]%8]}${pNames[bPieces[Math.abs(selectedPiece[0])-1].img]}x${colums[px]}${rows[py]}`)
        }
          
    }
    if(moveList.length==length){
        moveList.push(`${pNames[wPieces[Math.abs(selectedPiece[0])-1].img]}${colums[px]}${rows[py]}`)
    }
    lastBKing = bKing
    lastWKing = wKing
    board[py][px] = selectedPiece[0]
    board[Math.floor(selectedPiece[1]/8)][selectedPiece[1]%8] = 0
    c.clearRect(0,0,w,h)
    c.drawImage(boardImg,0,0,canvas.width,canvas.height)
    drawMoves(true)
    animate()
    turncount++
    turn = turns[turncount%2]
    moves.innerHTML = moveList.join(", ")
    filterPossible()
}

function calcDifference(){
    var diff = whiteMaterial-blackMaterial
    var num = Math.pow(Math.abs(diff/39), 1/3)*50
    mDifference.innerHTML = `${Math.abs(diff)}.0`
    if(diff>0){
        wMaterial.style.height = `${50+num}%`
        bMaterial.style.height = `${50-num}%`
        mDifference.style.bottom = `${50+num-32/h*100}%`
        mDifference.style.color = "black"
    }
    else{
        bMaterial.style.height = `${50+num}%`
        wMaterial.style.height = `${50-num}%`
        mDifference.style.bottom = `${50-num}%`
        mDifference.style.color = "white"
    }
}

//tegner de mulige trekkene 
function animateOptions(){
    c.drawImage(boardImg,0,0,canvas.width,canvas.height)
    drawMoves(false)
    c.drawImage(big, 0.034*canvas.width+px*(canvas.width-canvas.width*0.068)/8,0.034*canvas.width+py*(canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
    for(i=0; i<board.length; i++){
        for(j=0; j<board.length; j++){
            if(movesMap[i][j]){
                c.drawImage(small, 0.034*canvas.width+j*(canvas.width-canvas.width*0.068)/8,0.034*canvas.width+i*(canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
            }
        }
    }
}

var last = []
function drawMoves(newMove){
    if(newMove){
        last = [px, py, selectedPiece[1]%8, Math.floor(selectedPiece[1]/8)]
    }
        c.drawImage(big, 0.034*canvas.width+last[0]*(canvas.width-canvas.width*0.068)/8,0.034*canvas.width+last[1]*(canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
        c.drawImage(big, 0.034*canvas.width+last[2]*(canvas.width-canvas.width*0.068)/8,0.034*canvas.width+last[3]*(canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8, (canvas.width-canvas.width*0.068)/8)
}

movesButton.addEventListener("click", displayMoves)
var displayed = false
function displayMoves(){
    if(!displayed){
        moves.style.display = "block"
        movesButton.innerHTML = "Hide moves"
    }
    else{
        moves.style.display = "none"
        movesButton.innerHTML = "Show moves"
    }
    displayed = !displayed
}