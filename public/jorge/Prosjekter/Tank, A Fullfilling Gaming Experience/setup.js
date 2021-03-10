const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.style.border = "1px solid black"
canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40



//disable right-click
document.addEventListener('contextmenu', event => event.preventDefault())

//disable drag
document.addEventListener('dragstart', event => event.preventDefault())

//henter inn et par html-elementer
let bodyEL = document.querySelector("body")
let overlay = document.querySelector(".overlay")
let wrapper = document.getElementById("wrapper")

overlay.style.width = `${canvas.width}px` 
overlay.style.height = `${canvas.height}px`





//definerer alle sprites som skal tegnes
let crosshair = new Image()
crosshair.src = "sprites/crosshair.png"

let splintImg = new Image()
splintImg.src = "sprites/splint.png"

let tankImg = new Image()
tankImg.src = "sprites/smallTank1.png"
let gunImg = new Image()
gunImg.src = "sprites/smallGun1.png"
let sniperBullet = new Image()
sniperBullet.src = "sprites/sniperBullet.png"
let pistolBullet = new Image()
pistolBullet.src = "sprites/pistolBullet.png"
let lmgBullet = new Image()
lmgBullet.src = "sprites/lmgBullet.png"



let healthPotImg = new Image()
healthPotImg.src = "sprites/healthPot.png"


//definerer lydene

let backgroundMusic = document.querySelector("audio")
backgroundMusic.volume = 0.03

let pistolAudio = new Audio()
let lmgAudio = new Audio()
let shotgunAudio = new Audio()
let winAudio = new Audio()
let loseAudio = new Audio()
let damagedAudio = new Audio()


pistolAudio.src = "sounds/pistol.mp3"
lmgAudio.src = "sounds/lmg.mp3"
shotgunAudio.src = "sounds/shotgun.mp3"
winAudio.src = "sounds/win.wav"
loseAudio.src = "sounds/lose.wav"
damagedAudio.src = "sounds/damaged.wav"

let audioArr = [pistolAudio, lmgAudio, shotgunAudio, winAudio, loseAudio, damagedAudio, backgroundMusic]



pistolAudio.volume = 0.01
lmgAudio.volume = 0.02
shotgunAudio.volume = 0.04
winAudio.volume = 0.01
loseAudio.volume = 0.07
damagedAudio.volume = 0.05

//midlertidig for å ikke spille av lyden
// audioArr.forEach( x => {
//     x.volume = 0
// })





//definerer mange variabler som jeg trenger
let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, moneyPerKill, pierces, tankLevel, 
mode, speedReduction, readyToShoot, baseDmg, bloom, fireRate, healthPotHeal, gunLevel, basePierces, 
shotGunShots, fallOffRange, bulletRadius, killCount, overlayInterval, hunterInterval, readyToStartNewWave, 
wave, b, addedDmg, totalHealthPots, shopBtns, prevPos, bulletImg

let splintSpeed = 6
let splodeRange = 50
let splodeDamage = 50
let splintArr = []
let splintAngle = Math.random()*2*Math.PI

let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let pickupDistance = 10
let oldTime = 0
let audioOldTime = 0
let volumeLevel = 2
let stop = true
let bulletArr = []
let hunterArr = []

let blur = false

let record = 1

if(localStorage.getItem("record") == null) localStorage.setItem("record", 1)
else record = Number(localStorage.getItem("record"))


//adder eventlisteners til de ulike nødvendige eventsa

document.querySelector("#smallTank").addEventListener("click", startGame)
document.querySelector("#bigTank").addEventListener("click", startGame)
window.addEventListener("mousemove", moveMouse)
overlay.addEventListener("mousedown", shoot)
window.addEventListener("mouseup", function(){ mouseIsPressed = false; startSpraying = false })
window.addEventListener("keyup", releaseKey)
window.addEventListener("keydown", pressDown)