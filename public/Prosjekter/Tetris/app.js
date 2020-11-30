const canvas = document.createElement("CANVAS");
const c = canvas.getContext("2d");
const canvas2 = document.createElement("CANVAS");
canvas2.id = "canvas2"
const c2 = canvas2.getContext("2d");
const scoreEl = document.querySelector("#div");
document.querySelector("body").appendChild(canvas);
document.querySelector("body").appendChild(canvas2);
canvas.width = 250;
canvas.height = canvas.width*2.4;

let startGame = false


//prøver å disable scrolling på tlf
// window.blockMenuHeaderScroll = true
// const bodyEl = document.querySelector("body")
// let music = new Audio()
// music.src = "Sprut.mp3"
// music.volume = 0.5

// music.addEventListener("end", ()=>{
//   music.pause()
//   music.currentTime = 0
//   music.play()
// })
// function startMusic(){
//   if(music.currentTime == 0) music.play()
// }
// window.addEventListener("click", startMusic)

let skalering
if(/Mobi|Android/i.test(navigator.userAgent)){
  // c.scale(50, 50)
  canvas.width*=2
  canvas.height*=2
  skalering = 50
}
else{
  // c.scale(25, 25)
  skalering = 25
}

const cols = 10;
const rows = 24;

let player = {x:3, y:0}
let storedMatrix;
let nextMatrix;
let collideWait = 0;
let tid = 990;
let dropping = false;
let testbool = true;

let score = 0;
let highscore = 0;

let colorArr = ["red", "orange", "purple", "blue", "lightgreen", "yellow", "pink"]

let nameArr = ["T", "L", "J", "I", "Z", "S", "K"];
let randomMatrix = () => nameArr[Math.floor(Math.random()*nameArr.length)]
 
let arena;

function createArena(){
arena = []
for(var i = 0; i<rows; i++){arena.push(new Array(cols).fill(0))}
}
createArena()

function merge(player, arena){
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value!=0){
        arena[player.y + y][player.x + x] = value;
      }
    })
  })
}


function swap(bool){
  [player.matrix, storedMatrix] = [storedMatrix, player.matrix]
  if(bool && doesCollide(player.matrix, arena, player.y)){
    swap(false)
  }
}

function createMatrix(matrix){

switch(matrix){
    case "T": return [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]; break;
    case "L" : return [
      [0, 0, 0],
      [2, 2, 2],
      [2, 0, 0],
    ]; break;
    case "J" : return [
      [0, 0, 0],
      [3, 3, 3],
      [0, 0, 3],
    ]; break;
    case "Z" : return [
      [0, 0, 0],
      [4, 4, 0],
      [0, 4, 4],
    ]; break;
    case "S" : return [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0],
    ]; break;
    case "K": return [
      [6, 6],
      [6, 6]
    ]; break;
    case "I" : return [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0]
    ]; break;
  }
}




function rotate(o){
  if(o.length == 3){
    [o[0][0], o[0][1], o[0][2], o[1][0], o[1][1], o[1][2], o[2][0], o[2][1], o[2][2]]
    = [o[0][2], o[1][2], o[2][2], o[0][1], o[1][1], o[2][1], o[0][0], o[1][0], o[2][0]]
  }
  else if(o.length == 4){
    [o[0][0], o[0][1], o[0][2], o[0][3], o[1][0], o[1][1], o[1][2], o[1][3], o[2][0], o[2][1], o[2][2], o[2][3], o[3][0], o[3][1], o[3][2], o[3][3]]
    = [o[0][3], o[1][3], o[2][3], o[3][3], o[0][2], o[1][2], o[2][2], o[3][2], o[0][1], o[1][1], o[2][1], o[3][1], o[0][0], o[1][0], o[2][0], o[3][0]]
  }
  if(doesCollide(o, arena, player.y)){
    rotate(o)

  }
}


function drawMatrix(matrix, offsetX, offsetY, colorOption, con){

  con.fillStyle = matrix.color
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value!=0){
        con.beginPath()
        if(colorOption == "preview") con.globalAlpha = 0.4
        else con.globalAlpha = 1
        con.fillStyle = colorArr[value-1]
        con.strokeStyle = "white"
        con.rect((x+offsetX)*skalering, (y+offsetY)*skalering, skalering, skalering)
        con.fill()
        if(con.globalAlpha == 1) {
        
          con.globalAlpha = 0.7
          con.stroke()
        }
        con.closePath()
      }
    })
  })
}

function updateScore(){
  if(score > highscore){highscore = score}
    scoreEl.innerHTML = `Score: ${score}<br><br>Highscore: ${highscore}`
}
updateScore()

function background(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = "white";
  c.lineWidth = skalering/25
  for(var i = 0; i <= cols; i++){
    c.moveTo(i*skalering, 0);
    c.lineTo(i*skalering, canvas.height)
  }
  for(var j = 0; j <= rows; j++){
    c.moveTo(0, j*skalering);
    c.lineTo(canvas.width, j*skalering)
  }
  c.stroke();
}

player.matrix = createMatrix(randomMatrix());
storedMatrix = createMatrix(randomMatrix());
nextMatrix = createMatrix(randomMatrix());
let testy = player.y

canvas2.width = 200
canvas2.height = 400

function draw(){
  background();

  c2.clearRect(0, 0, canvas2.width, canvas2.height);


  c2.globalAlpha = 1
  c2.fillStyle = "black"
  c2.font = "15px Arial"
  c2.fillText("Press ENTER to swap", 10, 18)
  c2.fillText("Next piece", 10, 195)


  // c2.fill()
  
  drawMatrix(arena, 0, 0, "standard", c);

  drawMatrix(player.matrix, player.x, player.y, "standard", c);

  drawMatrix(player.matrix, player.x, testy, "preview", c);

  drawMatrix(storedMatrix, 1, 1, "standard", c2);

  drawMatrix(nextMatrix, 1, 8, "standard", c2);

}


function drop(){
  console.log("dropping")
  player.y++;
  dCount = 0
  if(doesCollide(player.matrix, arena, player.y)){
    player.y--;
    collideWait++;
    if(collideWait == 2){
      merge(player, arena)
      resetPlayer()
    }
  }
  else{
    collideWait = 0;
  }
}

function testDrop(){
  testy++
  if(doesCollide(player.matrix, arena, testy)){
    testy--
    testbool = false
  }
}

let elapsedTime = 0
let lastTime = 0;
let dCount = 0;
function animate(time = 0){
  elapsedTime = time
  const deltaTime = time-lastTime;
  lastTime = time;
  dCount += deltaTime;
  if(dCount > tid){
    drop();
  }
  draw()
  preview()

  requestAnimationFrame(animate)
}



function move(dir){
    player.x += dir;
    if(doesCollide(player.matrix, arena, player.y)){
      player.x += -dir;
    }
}


window.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 37: move(-1); break
    case 39: move(1); break
    case 40: drop(); break
    case 32: hardDrop(); break
    case 82: rotate(player.matrix); break
    case 38: rotate(player.matrix); break
    case 13: swap(true); break
  }
})

let touchStartTime = undefined
let touchStartX = undefined
let touchStartY = undefined
// let swipeX = 0
let swipeY = true
let isMoving = false
window.addEventListener("touchstart", (e)=>{
  e.preventDefault()
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  touchStartY2 = e.touches[0].clientY
  touchStartTime = elapsedTime
  // swipeX = -1
  swipeY = true
  isMoving = false
})
window.addEventListener("touchend", (e)=>{
  e.preventDefault()
  if(!isMoving){
    rotate(player.matrix)
    // startMusic()
  }
})
window.addEventListener("touchmove", (e)=>{
  isMoving = true
  // swipeX++
  let deltaX = touchStartX-e.touches[0].clientX
  let deltaY = e.touches[0].clientY-touchStartY
  let deltaY2 = e.touches[0].clientY-touchStartY2
  if(deltaY2 > 30){
    drop()
    touchStartY2 = e.touches[0].clientY
  }
  // if(deltaY > 200 && swipeY){
  //   hardDrop()
  //   swipeY = false
  // }
  if(Math.abs(deltaX) > 40){
    touchStartX = e.touches[0].clientX

     if(deltaX > 0) move(-1)

     else move(1)
   }
})
function sweep(arena){
  let sweepCount = 0;
  outer:
   for(let y = 0; y<arena.length; y++){
     for(let x = 0; x<arena[y].length; x++){
       if(arena[y][x] == 0) continue outer
     }
     arena.splice(y, 1);
     arena.unshift(new Array(cols).fill(0))
     sweepCount++
   }
  switch(sweepCount){
    case 1: score+=100; break;
    case 2: score+=300; break;
    case 3: score+=600; break;
    case 4: score+=1000; break;
    default: break;
  }
  if(sweepCount!=0){
    tid*=0.95
  }
  updateScore();
}



function doesCollide(matrix, arena, y){
  const [m, oX, oY] = [matrix, player.x, y]

  for(let y = 0; y<m.length; y++){
    for(let x=0; x<m[y].length; x++){
      if(m[y][x] !== 0 && (arena[y+oY] && arena[y+oY][x+oX]) !== 0){
        return true;
      }
    }
  }
  return false
}



function resetPlayer(){
  sweep(arena);
  collideWait = 0;
  player = {x:3, y:0};
  player.matrix = nextMatrix;
  nextMatrix = createMatrix(randomMatrix());
  dropping = false;
  testbool = true;
  if(doesCollide(player.matrix, arena, player.y)){
    // Legger inn player-score i databasen
    fetch(baseURL + "/new_rating", {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, score: score})
    }).then(res=>res.text())
      .then(res => console.log(res)).then(populate_scoreboard)
    resetGame();
  }
  testy = player.y
  // tid*=0.99
}

function resetGame(){
  createArena();
  resetPlayer();
  score= 0;
  tid = 990;
  updateScore();
}

function preview(){
  testy = player.y
  testbool = true
  let temp = JSON.parse(JSON.stringify(arena))
  while(testbool){
    testDrop()
  }
}

function hardDrop(){
  dropping = true;
  while (dropping){
    drop();
  }
}



