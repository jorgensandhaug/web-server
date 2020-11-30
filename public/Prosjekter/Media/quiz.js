var audioArr = ["elefant.mp3", "gris.mp3", "ku.mp3", "løve.mp3", "tiger.mp3"]
var videoArr = ["1.mp4", "4.mp4"]
var altArr = ["Elefant", "Gris", "Ku", "Løve", "Tiger", "Sjiraff", "Gnu"]
var count = 0
var points = 0
var mes = ""
var canvas = document.querySelector("canvas")
var pointsEl = document.getElementById("points")
var messageEl = document.getElementById("message")
var alts = document.querySelectorAll("input[type='radio']")
var labels = document.querySelectorAll("label")
var videoEl = document.getElementById("video")
var audioEl = document.getElementById("audio")
var ansEl = document.getElementById("ans")
var boxEl = document.getElementById("box")
var nameEl = document.getElementById("name")
var startEl = document.getElementById("start")
var resultEl = document.getElementById("result")
startEl.addEventListener("click", start)
var name = ""
function start(){
    startEl.removeEventListener("click", start)
    nameEl.style.display = "none"
    name = nameEl.value
    startEl.style.display = "none"
    boxEl.style.display = "block"
    pointsEl.style.display = "block"
    pointsEl.innerHTML = `Du har ${points} poeng`
    newQuest()
}
for(i=0; i<alts.length; i++){
    alts[i].addEventListener("change", showSubmit)
}
function showSubmit(){
    ansEl.style.display = "block"
    messageEl.style.display = "none"
}
ansEl.addEventListener("click", newQuest)
function newQuest(){
    if(count>0){
        for(i=0; i<alts.length; i++){
            if(alts[i].checked){
                selected = labels[i].innerHTML
                break
            }
        }
        messageEl.style.display = "block"
        if(selected==altArr[count-1]){
            points++
            pointsEl.innerHTML = `Du har ${points} poeng`
            messageEl.innerHTML = `Veldig bra, ${name}!`
        }
        else{
            messageEl.innerHTML = `Dette ble feil, ${name}.`
        }
    }
    if(count==7){
        endQuiz()
        return
    }
    
    ansEl.style.display = "none"
    for(i=0; i<alts.length; i++){
        alts[i].checked = false
    }
    
    var temp = []
    for(i=0; i<labels.length;){
        var r = Math.floor(Math.random()*altArr.length)
        if(temp.indexOf(r)==-1 && r!=count){
            temp.push(r)
            i++
        }
    }
    r = Math.floor(Math.random()*alts.length)
    temp[r] = count
    for(i=0; i<temp.length; i++){
        labels[i].innerHTML = altArr[temp[i]]
    }
    if(count<5){
        audioEl.style.display = "block"
        audioEl.src = audioArr[count]
        audioEl.play()
    }
    else if(count<7){
            audioEl.style.display = "none"
        videoEl.style.display = "block"
        videoEl.src = videoArr[count-5]
        videoEl.play()
    }
    count++
}
function endQuiz(){
    switch (points) {
        case 0:
            mes = "Nei og nei. Du tar feil"
            break;
        case 1:
            mes = "Du må opp i ringa!"
            break;
        case 2:
            mes = "Vi leker ikke quiz her!"
            break;
        case 3:
            mes = "Omsorgssvikt i barndommen?"
            break;
        case 4:
            mes = "Øvelse gjør mester"
            break;
        case 5:
            mes = "Ikke verst"
            break;
        case 6:
            mes = "Første taperplass"
            break;
        case 7:
            mes = "Alt riktig. Detta var sollid"
            break;
    }
    ansEl.style.display = "none"
    resultEl.style.display  = "block"
    for(i=0; i<alts.length; i++){
        alts[i].disabled = true
    }
}
resultEl.addEventListener("click", showResults)
function showResults(){
    videoEl.style.display = "none"
    boxEl.style.display = "none"
    resultEl.style.display = "none"
    messageEl.innerHTML = mes
    messageEl.style.display = "block"
    canvas.style.display = "block"
    pointsEl.innerHTML = `Du fikk ${points} av 7 poeng, ${name}`
    c = canvas.getContext("2d")
    c.beginPath()
    c.moveTo(canvas.width/2, canvas.height/2)
    c.fillStyle = "red"
    c.arc(canvas.width/2, canvas.height/2, 70, 0, Math.PI*2)
    c.fill()
    c.beginPath()
    c.moveTo(canvas.width/2, canvas.height/2)
    c.fillStyle = "green"
    c.arc(canvas.width/2, canvas.height/2, 70, 3*Math.PI/2, (points/7)*2*Math.PI + 3*Math.PI/2)
    c.fill()

}