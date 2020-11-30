const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

scoreboard()

const delay = 100
const scale = 30
const cWidth = 900
const cHeight = 600
const cols = cWidth / scale
const rows = cHeight / scale

const tail = []


canvas.width = cWidth
canvas.height = cHeight

function ruter() {
    for (let i = 0; i <= cols; i+=1) {
        c.beginPath()
        c.strokeStyle = "grey"
        c.moveTo(i*scale, 0)
        c.lineTo(i*scale, cHeight)
        c.stroke()
    }
    for (let i = 0; i < rows; i+=1) {
        c.beginPath()
        c.strokeStyle = "grey"
        c.moveTo(0, i*scale)
        c.lineTo(cWidth, i*scale)
        c.stroke()
    }
}

ruter()

snake = new Snake(scale, 0)
fruit = new Fruit()
snake.draw()







let loop = setInterval(() => {
    // console.log(snake.x/scale, snake.y/scale)
    c.clearRect(0, 0, cWidth, cHeight)
    ruter()
    snake.eating(fruit)
    for (let i = 0; i < snake.tail.length; i++) {
        if(snake.tail[i].x == fruit.x && snake.tail[i].y == fruit.y) {
            fruit.pickNewLocation()
        }
        
    }
    fruit.draw()
    snake.update()
    snake.changeDirection()
    snake.draw()
    snake.drawTails()
}, delay);


window.addEventListener('keydown', (e => {
    let direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
  }));

window.addEventListener('keydown', (e => {
    if(e.key == "Escape")clearInterval(loop)
  }));

window.addEventListener('keydown', (e => {
    if(e.key == "d") {
        console.log("funka")
        fruit.pickNewLocation()
        snake.tail.push(new Tail(Math.PI / 2, hale_slutt))
    }
  }));