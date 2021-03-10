var canvas= document.getElementById('canvas');
var c= canvas.getContext("2d");
canvas.width= window.innerWidth-40;
canvas.height= window.innerHeight-40;

function Circle(x, y, r, r2, radians, f){
  this.x = x,
  this.y= y,
  this.r=r,
  this.radians=radians,
  this.r2=r2,
  this.x1=0,
  this.y1=0,
  this.f=f,
  this.fart=0.05,
  this.posX=innerWidth/2,
  this.posY=innerHeight/2,
  this.dx=0,
  this.dy=0,

  this.draw= function(){
    c.beginPath();
    c.moveTo(this.x1, this.y1)
    c.lineTo(this.x, this.y)
    c.lineWidth= 6;
    c.strokeStyle= this.f;
    c.stroke();
  }

  this.update= function(){
    this.x1=this.x;
    this.y1=this.y;
    this.radians+=this.fart;
    // this.x= mouse.x+Math.cos(this.radians)*this.r2
    // this.y= mouse.y+Math.sin(this.radians)*this.r2
    this.x= this.posX+Math.cos(this.radians)*this.r2
    this.y= this.posY+Math.sin(this.radians)*this.r2
    if(Math.sqrt(Math.pow(this.posX-mouse.x, 2) + Math.pow(this.posY-mouse.y, 2))>5) {
    this.posX+=(this.dx/20);
    this.posY+=(this.dy/20)};
    this.draw();
  }
}

var mouse= {
  x: undefined,
  y: undefined
}

window.addEventListener("mousemove", function(event){
  mouse.x= event.x; mouse.y = event.y;
  for(var i=0; sirkelArr.length; i++){
    sirkelArr[i].dx=mouse.x-sirkelArr[i].posX;
    sirkelArr[i].dy=mouse.y-sirkelArr[i].posY;
  }
})

var r2;
var radians;
var fargeArr=["#12355B", "#D72638", "#FF570A", "#3F826D", "#A9FFF7"]
var f;
var sirkelArr=[]
for(var i=0; i<50; i++){
  radians= Math.random()*360
  r2=  Math.random()*40+100
  f= fargeArr[Math.floor(Math.random()*fargeArr.length)]
  sirkelArr.push(new Circle(canvas.width/2, canvas.height/2, 10, r2, radians, f))
}


function animate(){
  requestAnimationFrame(animate);
  c.beginPath();
  c.fillStyle = 'rgba(255, 255, 255, 0.05)';
  c.fillRect(0, 0, innerWidth, innerHeight)
  c.closePath();
  for(var i=0; i<sirkelArr.length; i++){
    sirkelArr[i].update();
  }
}
animate();
