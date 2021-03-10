var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
canvas.height = 641
canvas.width = 641
var h = canvas.height
var tile = 80
var activeTile = 0
var activeTileVal = 0
var newTileVal = 0
var newTile = 0
var selected = false
var white = true
var pAttack = false
var pAttack2 = true
var sKCount = 0
var hKCount = 0
var sRokkadeL = true
var sRokkadeK = true
var hRokkadeL = true
var hRokkadeK = true
var rokkade = false
var rokkadeType = 0
var svartTid = 60
var hvitTid = 60
var resultEl = document.getElementById("result")
var img = new Image()
img.src = "brikker.png"

// henter canvas_div-elementet
const canvas_div = document.querySelector('.canvas_div')



var board = [
    [12,13,14,15,16,14,13,12],
    [11,11,11,11,11,11,11,11],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [21,21,21,21,21,21,21,21],
    [22,23,24,25,26,24,23,22]
]
//console.log(board)

var sBonde = 11
var sTorn = 12
var sHest = 13
var sLoper = 14
var sDronning = 15
var sKonge = 16

var hBonde = 21
var hTorn = 22
var hHest = 23
var hLoper = 24
var hDronning = 25
var hKonge = 26




window.addEventListener("click", checkpos)

function checkpos(e){
    //console.log(selected)
    //console.log(white)
    console.log(1)
    if(e.clientX>0 && e.clientY<h && e.clientX>0 && e.clientY<h && selected==false){
        activeTileVal = board[Math.floor(e.clientY/80)][Math.floor(e.clientX/80)]
        activeTile = [Math.floor(e.clientY/80),Math.floor(e.clientX/80)]
        //console.log(activeTile)

        if(board[activeTile[0]][activeTile[1]]>0){
            selected = true
        }
        return
    }

    newTileVal = board[Math.floor(e.clientY/80)][Math.floor(e.clientX/80)]
    newTile = [Math.floor(e.clientY/80),Math.floor(e.clientX/80)]


    if(white==false && activeTileVal>20){
        selected=false
    }
    if(white==true && activeTileVal<20){
        selected=false
    }
    //hvit
    if(activeTileVal>20 && white==true && selected==true){

        if(newTileVal>20){
            selected=false
            pAttack2=false
        }
        //hvit kort rokkade
        if(hRokkadeK==true && activeTileVal==26 && newTileVal==22 && newTile[0]==7 && newTile[1]==7){
            if(board[7][5]==0 && board[7][6]==0){
                rokkade = true
                rokkadeType = 3
            }
        }
        //hvit lang rokkade
        if(hRokkadeL==true && activeTileVal==26 && newTileVal==22 && newTile[0]==7 && newTile[1]==0){
            if(board[7][1]==0 && board[7][2]==0 && board[7][3]==0){
                rokkade = true
                rokkadeType = 4
            }
        }
        //Hvit bonde
        if(activeTileVal==hBonde){
            if(newTileVal>0 && Math.abs(activeTile[0]-newTile[0])==1 && Math.abs(activeTile[1]-newTile[1])==1){
                pAttack = true
            }
            if(newTile[0]<activeTile[0]-2){
                selected=false
            }
            if(activeTile[0]!=6 && newTile[0]<activeTile[0]-1){
                selected=false
            }
            if(activeTile[1]!=newTile[1]){
                selected=false
            }
            if(newTile[0]>activeTile[0]){
                selected=false
            }
            if(newTileVal!=0){
                selected=false
            }
            if(pAttack==true && pAttack2==true){
                selected=true
                pAttack=false
            }
            pAttack2=true
        }
        //Hvitt tårn
        if(activeTileVal==hTorn){
            if(activeTile[0]!=newTile[0] && activeTile[1]!=newTile[1]){
                selected=false
            }
            if(activeTile[0]!=newTile[0]){
                if(activeTile[0]<newTile[0]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[0]>newTile[0]){
                    for(i=newTile[0]+1; i<activeTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
            }
            if(activeTile[1]!=newTile[1]){
                if(activeTile[1]<newTile[1]){
                    for(i=activeTile[1]+1; i<newTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[1]>newTile[1]){
                    for(i=newTile[1]+1; i<activeTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
            }
        }
        //Hvit hest
        if(activeTileVal==hHest){
            if(newTile[0]!=activeTile[0]+2 && newTile[0]!=activeTile[0]-2 && newTile[0]!=activeTile[0]+1 && newTile[0]!=activeTile[0]-1){
                selected=false
            }
            if(newTile[1]!=activeTile[1]+2 && newTile[1]!=activeTile[1]-2 && newTile[1]!=activeTile[1]+1 && newTile[1]!=activeTile[1]-1){
                selected=false
            }
            if(Math.abs(newTile[0]-activeTile[0])==Math.abs(newTile[1]-activeTile[1])){
                selected=false
            }
        }
        //Hvit løper
        if(activeTileVal==hLoper){
            if(Math.abs((newTile[0]-activeTile[0])*(newTile[1]-activeTile[1]))!=(newTile[0]-activeTile[0])*(newTile[0]-activeTile[0])){
                selected=false
            }
            if(newTile[0]==activeTile[0] || newTile[1]==activeTile[1]){
                selected=false
            }
            if(newTile[0]>activeTile[0]){
                //sørøst
                if(newTile[1]>activeTile[1]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                            selected=false
                        }
                    }
                }
                //sørvest
                if(newTile[1]<activeTile[1]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                            selected=false
                        }
                    }
                }
            }
            if(newTile[0]<activeTile[0]){
                //nordøst
                if(newTile[1]>activeTile[1]){
                    for(i=activeTile[0]-1; i>newTile[0]; i--){
                        if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                            selected=false
                        }
                    }
                }
                //nordvest
                if(newTile[1]<activeTile[1]){
                    for(i=activeTile[0]-1; i>newTile[0]; i--){
                        if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                            selected=false
                        }
                    }
                }
            }
        }
        //Hvit konge
        if(activeTileVal==hKonge){
            if(Math.abs((newTile[0]-activeTile[0])*(newTile[1]-activeTile[1]))>2){
                selected=false
            }
            if(Math.abs(newTile[0]-activeTile[0])>=2 || Math.abs(newTile[1]-activeTile[1])>=2){
                selected=false
            }
        }
        //Hvit dnonning
        if(activeTileVal==hDronning){
            if(newTile[0]==activeTile[0]){}
            else if(newTile[1]==activeTile[1]){}
            else if(Math.abs((newTile[0]-activeTile[0])*(newTile[1]-activeTile[1]))==(newTile[0]-activeTile[0])*(newTile[0]-activeTile[0])){}
            else{
                selected=false
            }
            if(activeTile[0]!=newTile[0] && activeTile[1]==newTile[1]){
                if(activeTile[0]<newTile[0]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[0]>newTile[0]){
                    for(i=newTile[0]+1; i<activeTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
            }
            else if(activeTile[1]!=newTile[1] && activeTile[0]==newTile[0]){
                if(activeTile[1]<newTile[1]){
                    for(i=activeTile[1]+1; i<newTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[1]>newTile[1]){
                    for(i=newTile[1]+1; i<activeTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
            }
            else if(Math.abs(activeTile[0]-newTile[0])>1){
                if(newTile[0]>activeTile[0]){
                    //sørøst
                    if(newTile[1]>activeTile[1]){
                        for(i=activeTile[0]+1; i<newTile[0]; i++){
                            if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                                selected=false
                            }
                        }
                    }
                    //sørvest
                    if(newTile[1]<activeTile[1]){
                        for(i=activeTile[0]+1; i<newTile[0]; i++){
                            if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                                selected=false
                            }
                        }
                    }
                }
                if(newTile[0]<activeTile[0]){
                    //nordøst
                    if(newTile[1]>activeTile[1]){
                        for(i=activeTile[0]-1; i>newTile[0]; i--){
                            if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                                selected=false
                            }
                        }
                    }
                    //nordvest
                    if(newTile[1]<activeTile[1]){
                        for(i=activeTile[0]-1; i>newTile[0]; i--){
                            if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                                selected=false
                            }
                        }
                    }
                }
            }
        }
    }

    //svart
    if(activeTileVal<20 && activeTileVal>10 && white==false && selected==true){

        if(newTileVal<20 && newTileVal>10 && activeTileVal>10 && activeTileVal<20){
            selected=false
            pAttack2=false
        }
        //svart kort rokkade
        if(sRokkadeK==true && activeTileVal==16 && newTileVal==12 && newTile[0]==0 && newTile[1]==7){
            if(board[0][5]==0 && board[0][6]==0){
                rokkade = true
                rokkadeType = 1
            }
        }
        //svart lang rokkade
        if(sRokkadeL==true && activeTileVal==16 && newTileVal==12 && newTile[0]==0 && newTile[1]==0){
            if(board[0][1]==0 && board[0][2]==0 && board[0][3]==0){
                rokkade = true
                rokkadeType = 2
            }
        }
        //Svart bonde
        if(activeTileVal==sBonde){
            if(newTileVal>0 && Math.abs(activeTile[0]-newTile[0])==1 && Math.abs(activeTile[1]-newTile[1])==1){
                pAttack = true
            }
            if(newTile[0]>activeTile[0]+2){
                selected=false
            }
            if(activeTile[0]>1 && newTile[0]>activeTile[0]+1){
                selected=false
            }
            if(activeTile[1]!=newTile[1]){
                selected=false
            }
            if(newTile[0]<activeTile[0]){
                selected=false
            }
            if(newTileVal!=0){
                selected=false
            }
            if(pAttack==true && pAttack2==true){
                selected=true
                pAttack=false
            }
            pAttack2=true
        }
        //Svart tårn
        if(activeTileVal==sTorn){
            if(activeTile[0]!=newTile[0] && activeTile[1]!=newTile[1]){
                selected=false
            }
            if(activeTile[0]!=newTile[0]){
                if(activeTile[0]<newTile[0]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[0]>newTile[0]){
                    for(i=newTile[0]+1; i<activeTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
            }
            if(activeTile[1]!=newTile[1]){
                if(activeTile[1]<newTile[1]){
                    for(i=activeTile[1]+1; i<newTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[1]>newTile[1]){
                    for(i=newTile[1]+1; i<activeTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
            }
        }
        //Svart hest
        if(activeTileVal==sHest){
            if(newTile[0]!=activeTile[0]+2 && newTile[0]!=activeTile[0]-2 && newTile[0]!=activeTile[0]+1 && newTile[0]!=activeTile[0]-1){
                selected=false
            }
            if(newTile[1]!=activeTile[1]+2 && newTile[1]!=activeTile[1]-2 && newTile[1]!=activeTile[1]+1 && newTile[1]!=activeTile[1]-1){
                selected=false
            }
            if(Math.abs(newTile[0]-activeTile[0])==Math.abs(newTile[1]-activeTile[1])){
                selected=false
            }
        }
        //Svart løper
        if(activeTileVal==sLoper){
            if(Math.abs((newTile[0]-activeTile[0])*(newTile[1]-activeTile[1]))!=(newTile[0]-activeTile[0])*(newTile[0]-activeTile[0])){
                selected=false
            }
            if(newTile[0]==activeTile[0] || newTile[1]==activeTile[1]){
                selected=false
            }
            if(newTile[0]>activeTile[0]){
                //sørøst
                if(newTile[1]>activeTile[1]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                            selected=false
                        }
                    }
                }
                //sørvest
                if(newTile[1]<activeTile[1]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                            selected=false
                        }
                    }
                }
            }
            if(newTile[0]<activeTile[0]){
                //nordøst
                if(newTile[1]>activeTile[1]){
                    for(i=activeTile[0]-1; i>newTile[0]; i--){
                        if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                            selected=false
                        }
                    }
                }
                //nordvest
                if(newTile[1]<activeTile[1]){
                    for(i=activeTile[0]-1; i>newTile[0]; i--){
                        if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                            selected=false
                        }
                    }
                }
            }
        }
        //Svart konge
        if(activeTileVal==sKonge){
            if(Math.abs((newTile[0]-activeTile[0])*(newTile[1]-activeTile[1]))>2){
                selected=false
            }
            if(Math.abs(newTile[0]-activeTile[0])>=2 || Math.abs(newTile[1]-activeTile[1])>=2){
                selected=false
            }
        }
        //Svart dnonning
        if(activeTileVal==sDronning){
            if(newTile[0]==activeTile[0]){}
            else if(newTile[1]==activeTile[1]){}
            else if(Math.abs((newTile[0]-activeTile[0])*(newTile[1]-activeTile[1]))==(newTile[0]-activeTile[0])*(newTile[0]-activeTile[0])){}
            else{
                selected=false
            }
                        if(activeTile[0]!=newTile[0] && activeTile[1]==newTile[1]){
                if(activeTile[0]<newTile[0]){
                    for(i=activeTile[0]+1; i<newTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[0]>newTile[0]){
                    for(i=newTile[0]+1; i<activeTile[0]; i++){
                        if(board[i][activeTile[1]]!=0){
                            selected=false
                        }
                    }
                }
            }
            else if(activeTile[1]!=newTile[1] && activeTile[0]==newTile[0]){
                if(activeTile[1]<newTile[1]){
                    for(i=activeTile[1]+1; i<newTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
                if(activeTile[1]>newTile[1]){
                    for(i=newTile[1]+1; i<activeTile[1]; i++){
                        if(board[activeTile[0]][i]!=0){
                            selected=false
                        }
                    }
                }
            }
            else if(Math.abs(activeTile[0]-newTile[0])>1){
                if(newTile[0]>activeTile[0]){
                    //sørøst
                    if(newTile[1]>activeTile[1]){
                        for(i=activeTile[0]+1; i<newTile[0]; i++){
                            if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                                selected=false
                            }
                        }
                    }
                    //sørvest
                    if(newTile[1]<activeTile[1]){
                        for(i=activeTile[0]+1; i<newTile[0]; i++){
                            if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                                selected=false
                            }
                        }
                    }
                }
                if(newTile[0]<activeTile[0]){
                    //nordøst
                    if(newTile[1]>activeTile[1]){
                        for(i=activeTile[0]-1; i>newTile[0]; i--){
                            if(board[i][activeTile[1]-(i-activeTile[0])]!=0){
                                selected=false
                            }
                        }
                    }
                    //nordvest
                    if(newTile[1]<activeTile[1]){
                        for(i=activeTile[0]-1; i>newTile[0]; i--){
                            if(board[i][i+activeTile[1]-activeTile[0]]!=0){
                                selected=false
                            }
                        }
                    }
                }
            }
        }
    }

    if(rokkade==true){
        selected = true
    }

    if(selected==true){
        if(rokkade==false){
            board[Math.floor(e.clientY/80)][Math.floor(e.clientX/80)] = board[activeTile[0]][activeTile[1]]
            board[activeTile[0]][activeTile[1]] = 0
        }
        else{
            if(rokkadeType==1){
                board[0][4]=0
                board[0][5]=12
                board[0][6]=16
                board[0][7]=0
            }
            if(rokkadeType==2){
                board[0][0]=0
                board[0][1]=16
                board[0][2]=12
                board[0][3]=0
                board[0][4]=0
            }
            if(rokkadeType==3){
                board[7][4]=0
                board[7][5]=22
                board[7][6]=26
                board[7][7]=0
            }
            if(rokkadeType==4){
                board[7][0]=0
                board[7][1]=26
                board[7][2]=22
                board[7][3]=0
                board[7][4]=0
            }
            rokkade = false
            rokkadeType = 0
        }
        console.log(board)
        selected=false
        white=!white
        for(i=0; i<board.length; i++){
            if(board[i].indexOf(16)==-1){
                sKCount++
            }
            if(board[i].indexOf(26)==-1){
                hKCount++
            }
        }
        if(board[0].indexOf(16)!=4){
            sRokkadeL = false
            sRokkadeK = false
        }
        if(board[0].indexOf(12)!=0){
            sRokkadeL = false
        }
        if(board[0].lastIndexOf(12)!=7){
            sRokkadeK = false
        }
        if(board[7].indexOf(26)!=4){
            hRokkadeL = false
            hRokkadeK = false
        }
        if(board[7].indexOf(22)!=0){
            hRokkadeL = false
        }
        if(board[7].lastIndexOf(22)!=7){
            hRokkadeK = false
        }
        console.log(sRokkadeL)
        console.log(sRokkadeK)
        console.log(hRokkadeL)
        console.log(hRokkadeK)


//        if(board[7].indexOf(26)!=4){
//            sRokkade = false
//            console.log(sRokkade)
//        }

        if(board[7].indexOf(11)!=-1){
            board[7][board[7].indexOf(11)]=15
        }
        if(board[0].indexOf(21)!=-1){
            board[0][board[0].indexOf(21)]=25
        }
    }
}

function drawBoard(){
    c.strokeStyle = "grey"
    for(i=0; i<h/tile; i++){
        c.beginPath()
        c.moveTo(0,tile*i)
        c.lineTo(h,tile*i)
        c.lineWidth = 5
        c.stroke()
    }
    for(i=0; i<h/tile; i++){
        c.beginPath()
        c.moveTo(i*tile,0)
        c.lineTo(i*tile, h)
        c.lineWidth = 5
        c.stroke()
    }
}

function animateBoard(){

    for(i=0; i<h/tile; i++){
        for(j=0; j<h/tile; j++){
            if(i%2!=j%2){
                c.beginPath()
                c.moveTo(i*tile,j*tile)
                c.fillStyle = "brown"
                c.fillRect(i*tile,j*tile,tile,tile)
                c.fill()
            }
        }
    }

    for(i=0; i<board.length; i++){
        for(j=0; j<board[i].length; j++){
            if(board[j][i]!=0){
                let width = 120
                let height = 120

                if(board[j][i]==hKonge){
                    var x0 = 10
                    var y0 = 175
                }
                if(board[j][i]==hDronning){
                    var x0 = 175
                    var y0 = 175
                }
                if(board[j][i]==hLoper){
                    var x0 = 505
                    var y0 = 175
                }
                if(board[j][i]==hHest){
                    var x0 = 670
                    var y0 = 175
                }
                if(board[j][i]==hTorn){
                    var x0 = 340
                    var y0 = 175
                }
                if(board[j][i]==hBonde){
                    var x0 = 835
                    var y0 = 175
                }
                if(board[j][i]==sKonge){
                    var x0 = 10
                    var y0 = 10
                }
                if(board[j][i]==sDronning){
                    var x0 = 175
                    var y0 = 10
                }
                if(board[j][i]==sLoper){
                    var x0 = 505
                    var y0 = 10
                }
                if(board[j][i]==sHest){
                    var x0 = 670
                    var y0 = 10
                }
                if(board[j][i]==sTorn){
                    var x0 = 340
                    var y0 = 10
                }
                if(board[j][i]==sBonde){
                    var x0 = 835
                    var y0 = 10
                }

                c.drawImage(img, x0, y0, width, height, i*80, j*80, 80, 80)
            }
        }
    }
}

function updateClock(){
    if(white==true && hvitTid>0){
        hvitTid--
    }
    if(white==false && svartTid>0){
        svartTid--
    }
        svart.innerHTML = "Svart: " + svartTid
        hvit.innerHTML = "Hvit: " + hvitTid
}
function checkGameOver(){
    if(sKCount==8 || svartTid<=0){
            resultEl.innerHTML = "Seier til hvit"
            window.removeEventListener("click", checkpos)
            //svartTid=0
            resultEl.style.backgroundColor = "white"
            resultEl.style.color = "black"
        }
        if(hKCount==8 || hvitTid<=0){
            resultEl.innerHTML = "Seier til svart"
            window.removeEventListener("click", checkpos)
            //hvitTid=0
            resultEl.style.backgroundColor = "black"
            resultEl.style.color = "white"
        }
        sKCount=0
        hKCount=0
}

function animate(){
    c.clearRect(0,0,h,h)
    animateBoard()
    drawBoard()
    checkGameOver()
    requestAnimationFrame(animate)
}
setInterval(updateClock,1000)
img.onload = animate
