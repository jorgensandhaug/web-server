canvas.width= window.innerWidth
canvas.height= window.innerHeight
posX = 0
posY = 0
size = 2
colorIndex = 1
let shapeIndex = 0
let shape
let lineMode = false
let grad, pointOne, pointTwo, sliderMode
let nisseMode = 
let nisse = new Image()
nisse.src = "julenissen.png"
map = []
drawing = false
var colorEl = document.querySelector("#color")
var shapeEl = document.querySelector("#shape")
var sizeEl = document.querySelector("input")
var widEl = document.getElementById("wid")
var heiEl = document.getElementById("hei")
var clearEl = document.querySelector("button")


function erase(){
    c.clearRect(0,0,canvas.width,canvas.height)
    sliderArr.forEach(item =>{
        item.draw()
    })
}
function newColor(){
    colorIndex = colorEl.selectedIndex
    if(colorIndex==12){
        sliderMode=true
        color = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        
    }
    else{ sliderMode=false }
    switch (colorIndex) {
        case 0:
            color = "white"
            break;
        case 1:
            color = "black"
            break;
        case 2:
            color = "blue"
            break;
        case 3:
            color = "red"
            break;
        case 4:
            color = "yellow"
            break;
        case 5:
            color = "green"
            break;
        case 6:
            color = "orange"
            break;
        case 7:
            color = "purple"
            break;
        case 8:
            color = "pink"
            break;
        case 9:
            color = "brown"
            break;
        case 10:
            color = "gray"
            break;
        case 11:
            grad = c.createLinearGradient(0, 0, canvas.width, canvas.height)
            grad.addColorStop(0.1, "magenta")
            grad.addColorStop(0.4, "blue")
            grad.addColorStop(0.9, "red")
            color = grad
            break;
        case 13:
            nisseMode = true
    }
    colorPreview()
}

function newShape(){
    shapeIndex = shapeEl.selectedIndex
    if(shapeIndex==0){
        lineMode =false
    }
    else if(shapeIndex==1){
        lineMode = true
    }
}

function newSize(){
    size = Number(sizeEl.value)
    console.log(size)
}
function scale(){
    if(widEl.value>100){
        canvas.width = widEl.value
    }
    if(heiEl.value>100){
        canvas.height = heiEl.value
    }
    
}
function pos(e){
    posX = (e.clientX-(window.innerWidth-canvas.width)/2)
    posY = (e.clientY-(window.innerHeight-canvas.height)/2)
}

function drawLine(){
    c.beginPath()
    c.moveTo(pointOne.x, pointOne.y)
    c.lineTo(pointTwo.x, pointTwo.y)
    c.lineWidth = size
    c.strokeStyle = color
    c.stroke()
    c.closePath()
}
for(i=0; i<canvas.height; i++){
    map.push([])
    for (j = 0; j<canvas.width; j++){
        map[i].push(0)
    }
}


function anim(){
    if(nisseMode){
        c.drawImage(nisse, 0, 0, 32, 32, posX, posY, size, size)
    }
    else{
        if(drawing && !slider1.state && !slider2.state && !slider3.state){
            cCirc(posX, posY, size, color)
            setTimeout(anim, 0.1)
        }
    }
}   


let hue = 0
let saturation = 50
let lightness = 50
let alpha = 1
color = `hsl(${hue}, ${saturation}%, ${lightness}%)`
class Slider{
    constructor(x, y, r, type, range){
    this.startX = x
    this.x = x 
    this.y = y
    this.r = r
    this.state = false
    this.type = type
    this.range = range
    }
    
    draw(variable){
        c.beginPath()
        c.font = "20px sans-serif"
        c.fillStyle = "black"
        c.clearRect(this.startX, this.y+12, 200, 40)
        c.fillText(`${this.type}: ${variable}`, this.startX, this.y+40)
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        c.fillStyle= "black"
        c.fill()
        
        // c.clearRect(this.startX, this.y+40, 100, 50)
        
    }
    update(){
        if(this.type == "hue"){
            hue = this.x-this.startX
            this.draw(hue)
        }
        else if(this.type == "saturation"){
            saturation = this.x-this.startX
            this.draw(saturation)
        }
        else if(this.type == "lightness"){
            lightness = this.x-this.startX
            this.draw(lightness)
        }
        
    }
    inRange(){
        if(Math.sqrt(Math.pow(mouse.x-this.x, 2) + Math.pow(mouse.y-this.y, 2)) < this.r){
            return true
        }
        return false
    }
}
let mouse = {x: undefined, y: undefined}

function mDown(e){
    mouse.x = e.clientX-(window.innerWidth-canvas.width)/2
    mouse.y = e.clientY-(window.innerHeight-canvas.height)/2
    if (slider1.inRange()){
        slider1.state = true
    }
    else if(slider2.inRange()){
        slider2.state = true
    }
    else if(slider3.inRange()){
        slider3.state = true
    }
    if(lineMode){
        pointOne = {x: posX, y:posY}
    }
    else{
        drawing = true
        anim()}
}
function mUp(){
    sliderArr.forEach(slider =>{
        slider.state = false
    })
    if(lineMode){
        pointTwo = {x: posX, y:posY}
        drawLine()
    }
    drawing = false
}
function updateSlider(slider){
    c.beginPath()
        c.fillStyle = "white"
        c.arc(slider.x, slider.y, slider.r, 0, 2*Math.PI)
        c.fill()
        c.closePath()
        slider.x = mouse.x
        if(slider.x > slider.startX+slider.range){
            slider.x = slider.startX+slider.range
        }
        if(slider.x < slider.startX){
            slider.x = slider.startX
        }
        slider.update()
}
function moveSlider(e){
    mouse.x = e.clientX-(window.innerWidth-canvas.width)/2
    mouse.y = e.clientY-(window.innerHeight-canvas.height)/2
    if(slider1.state){
        updateSlider(slider1)}
    else if(slider2.state){
        updateSlider(slider2)
    }
    else if(slider3.state){
        updateSlider(slider3)
    }
    if(sliderMode){
        color = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        colorPreview()
    }
}
function colorPreview(){
    c.fillStyle=color
    c.fillRect(100, 20, 40, 40)
}
    
let slider1 = new Slider(200, 50, 10, "hue", 360)
let slider2 = new Slider(600, 50, 10, "saturation", 100)
let slider3 = new Slider(860, 50, 10, "lightness", 100)
let sliderArr = [slider1, slider2, slider3]
sliderArr.forEach(item => {
    item.draw()
})
window.addEventListener("mousedown", mDown)
window.addEventListener("mouseup", mUp)
window.addEventListener("mousemove", moveSlider)
colorEl.addEventListener("change", newColor)
sizeEl.addEventListener("change", newSize)
canvas.addEventListener("mousemove", pos)w
heiEl.addEventListener("change", scale)
widEl.addEventListener("change", scale)
clearEl.addEventListener("click", erase)
shapeEl.addEventListener("change", newShape)