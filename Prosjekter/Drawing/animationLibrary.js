var pi = Math.PI
var yLeft = []
var yRight = []
var xTop = []
var xBot = []
var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

function cRect(x,y,wid,hei,color){
    c.beginPath()
    c.moveTo(x,y)
    c.fillStyle = color
    c.fillRect(x,y,wid,hei)
    c.fill()
}

function cCirc(x,y,r,color){
    c.beginPath()
    c.moveTo(x,y)
    c.fillStyle = color
    c.arc(x,y,r,0,2*pi)
    c.fill()
}

function cText(text,x,y,color,font){
    c.beginPath()
    c.moveTo(x, y)
    c.fillStyle = color
    c.font = font
    c.fillText(text, x, y)
    c.fill()
}

function cLine(x1,y1,x2,y2,color){
    c.beginPath()
    c.moveTo(x1,y1)
    c.lineTo(x2,y2)
    c.strokeStyle = color
    c.stroke()
}

function log(a){
    console.log(a)
}

function abs(num){
    return Math.abs(num)
}

function cos(ang){
    return Math.cos(ang)
}

function random(min, max){
    return Math.floor(Math.random()*(max-min))+min
}

function sin(ang){
    return Math.sin(ang)
}

function scaleVector(v, s){
    v = [v[0]*s, v[1]*s]
}

function addVector(u, v){
    return [u[0]+v[0], u[1]+v[1]]
}

function vecMatMult(m, v){
    v = [v[0]*m[0][0] + v[1]*m[0][1], v[0]*m[1][0] + v[1]*m[1][1]]
}

function createGridPoints(grid, multip, margin){
    for(i=0; i<canvas.height/grid*multip; i+=2){
        yLeft[i] = [-margin, i*grid]
        yRight[i] = [canvas.width+margin, i*grid]
        yLeft[i+1] = [-margin, -i*grid]
        yRight[i+1] = [canvas.width+margin, -i*grid]
    }
    for(i=0; i<canvas.width/grid*10; i+=2){
        xTop[i] = [i*grid, -margin]
        xBot[i] = [i*grid, canvas.height+margin]
        xTop[i+1] = [-i*grid, -margin]
        xBot[i+1] = [-i*grid, canvas.height+margin]
    }
}
function drawGridAdv(color, x, y){
    for(i=0; i<xTop.length; i++){
        c.beginPath()
        c.moveTo(xTop[i][0]+x,xTop[i][1]+y)
        c.lineTo(xBot[i][0]+x,xBot[i][1]+y)
        c.strokeStyle = color
        c.stroke()
    }
    for(i=0; i<yLeft.length; i++){
        c.beginPath()
        c.moveTo(yLeft[i][0]+x,yLeft[i][1]+y)
        c.lineTo(yRight[i][0]+x,yRight[i][1]+y)
        c.strokeStyle = color
        c.stroke()
    }
}
function drawGrid(grid, color){
    for(i=0; i<canvas.height/grid; i++){
        c.beginPath()
        c.moveTo(0, i*grid)
        c.lineTo(canvas.width, i*grid)
        c.strokeStyle = color
        c.stroke()
    }
    for(i=0; i<canvas.width/grid; i++){
        c.beginPath()
        c.moveTo(i*grid, 0)
        c.lineTo(i*grid, canvas.height)
        c.strokeStyle = color
        c.stroke()
    }
}
function compArray(a, b){
    for(i=0; i<a.length; i++){
        for(j=0; j<a[i].length; j++){
            if(a[i][j]!=b[i][j]){
                return false
            }
        }
    }
    return true
}
function arrayContains(a, arr){
    for(i=0; i<arr.length; i++){
        for(j=0; j<arr[i].length; j++){
            if(arr[i][j]==a){
                return true
            }
        }
    }
    return false
}