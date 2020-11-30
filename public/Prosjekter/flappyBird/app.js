var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")


//startfunksjonen kjører om det er mellomromstasten som er trykket ned. 
window.addEventListener("keydown", start)

function start(e){
    if (e.keyCode === 32){
        e.preventDefault()
        tegn()
        //denne linjen gjør så startfunksjonen ikke kjører hver gang man trykker på spacebar
        window.removeEventListener("keydown", start)
    }
}



var highscoreEl = document.getElementById("highscore")
var lastscoreEl = document.getElementById("lastScore")


//lager bilder og lyder
var fugl = new Image()
var bg = new Image()
var fg = new Image()
var pipeNorth = new Image()
var pipeSouth = new Image()

fugl.src="images/bird.png"
bg.src="images/bg.png"
fg.src="images/fg.png"
pipeNorth.src="images/pipeNorth.png"
pipeSouth.src="images/pipeSouth.png"

var fugleLyd = new Audio()
var scoreLyd = new Audio()
fugleLyd.src = "sounds/fly.mp3"
scoreLyd.src = "sounds/score.mp3"



//lagrer høyder og bredder til relevante elementer som var fordi det ikke funker å referere til .height og .width til bilder i canvas tydeligvis
var pipeHoyde = 242
var pipeBredde = 52
var fuglHoyde = 26
var fuglBredde = 38
var fgHoyde = 118
var gapConst = 110
var gap = pipeHoyde + gapConst

var score = 0

//fuglekoordinatene ved start
var fX = 10
var fY = 150

//tyngdeakselerasjonen gitt ved lille g
var g=0.1
//farten i y-retning er satt til 0 ved start og øker desto lenger spilleren ikke trykker på mellomromstasten
var fart=0

//pipekoordinater
var pipe =[]
pipe[0]={
    x: canvas.width, 
    y:0
}


//spillet spilles med mellomromstasten, og når den trykkes ned flyr fuglen oppover
window.onkeydown = fly
function fly(e){
    if(e.keyCode === 32){
        fart=-3
        fugleLyd.play()
    }
}


//tegner opp bakgrunnsbildet
window.onload = function(){
    c.drawImage(bg,0,0)
    c.drawImage(fg,0,canvas.height-fgHoyde)
}

//scorene skrives ut til sine diver her
lastscoreEl.innerHTML += "<br>"+ window.localStorage.getItem("name") + ": "+ window.localStorage.getItem("poeng") + "<br>"
highscoreEl.innerHTML += "<br>"+ window.localStorage.getItem("name") + ": "+ window.localStorage.getItem("highscore") + "<br>"




//hovedfunksjonen i koden
function tegn(){
    //setter hele funksjonen inni en setTimeout for å animere.
    setTimeout(function(){
    c.drawImage(bg,0,0)
    
    for(var i=0;i<pipe.length;i++){
        //her tegnes og flyttes pipene mot venstre
        c.drawImage(pipeNorth, pipe[i].x, pipe[i].y)
        c.drawImage(pipeSouth, pipe[i].x, pipe[i].y+gap)
        pipe[i].x--
        
        //når pipen har kommet langt nok til venstre på skjermen lages en ny pipe ved å pushe inn en ny i arrayet
        if(pipe[i].x==100){
            pipe.push({
                x: canvas.width, 
                y: Math.floor(Math.random()*pipeHoyde)-pipeHoyde
            })
        }
        
        //sjekker kollisjon mellom fugl og de diverse stdene på pipene som fuglen kan treffe. gjør så fuglen kun kan fly imellom gapet. den siste er mellom bakken og fuglen.
        //om en kollisjon oppdages er spillet over, nettsiden oppdateres, score lagres og man er på start igjen 
        if(fX+fugl.width >= pipe[i].x && fX <= pipe[i].x+pipeBredde && (fY<=pipe[i].y+pipeHoyde || fY+fuglHoyde >= pipe[i].y + gap) || fY+fuglHoyde >= canvas.height-fgHoyde){
            

            window.localStorage.setItem("poeng", JSON.stringify(score))
                        
            //om scoren man fikk i spillet nå er større enn den som ligger inne som highscore så endres highscoren
            if(Number(window.localStorage.getItem("highscore")) < score){
                window.localStorage.setItem("highscore", JSON.stringify(score))
            }


                location.reload();
        }
            
            //legger til et poeng på score dersom man kommer seg gjennom en pipe
            if(pipe[i].x==5){
                score++
                scoreLyd.play()
            }
            
        }
    

    //animerer forgunnen 
    c.drawImage(fg,0,canvas.height-fgHoyde)

    //animerer fuglen nedover
    c.drawImage(fugl, fX, fY)
    fart += g
    fY += fart

    //skriver opp scoren på skjermen
    c.fillStyle = "#000"
    c.font = "20px Helvetica"
    c.fillText("Score: "+score, 15,canvas.height-20)
    tegn()
}
,1000/200) //her er slutten på setTimeout. 1000/200 betyr at jeg vil at den skal oppdatere seg 200 ganger per 1000 millisekunder altså 200 ganger i sekundet
}



