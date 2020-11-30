var canvas = document.getElementById("canvas");
var c= canvas.getContext("2d");
canvas.width= window.innerWidth-50;
canvas.height= window.innerHeight-50;
let random;
let rectUp=0;
function ra(){
  random = Math.random()*20-10;
  if(random>-7 && random <7){ra();}
  return random;}
var ball = {
  x:(innerWidth-50)/2,
  y:(innerHeight-50)/2,
  r: 10,
  dx: 0,
  dy: 0,

  draw: function(){
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2* Math.PI);
    c.fillStyle="blue";
    c.fill();
    c.closePath();
  },

  update: function(){
    this.x+=this.dx;
    this.y+=this.dy;
    this.draw();
  }
}



var rect1 = {
  x: 30,
  dy: 15,
  h: 300,
  y: (canvas.height/2)-(300/2),

  draw: function(){
    c.beginPath();
    c.fillStyle= "black";
    c.fillRect(this.x, this.y, 20, this.h)
    c.fill();
  },

}


var rect2 = {
  x: innerWidth-100,
  dy: 15,
  h: 300,
  y: (canvas.height/2)-(300/2),

  draw: function(){
    c.beginPath();
    c.fillStyle= "black";
    c.fillRect(this.x, this.y, 20, this.h)
    c.fill();
  },
  // update: function(){
  //   this.y-=this.dy;
  //   this.draw();
  // }
}
function rectUpdate(){

}

var controller={
  lUp:false,
  lDown:false,
  rUp:false,
  rDown:false,
}


function spill(event){
  var keyS = (event.type=="keydown")?true:false;

if(event.keyCode==38){controller.rUp=keyS}
else if(event.keyCode==40){controller.rDown=keyS}
else if(event.keyCode==87){controller.lUp=keyS}
else if(event.keyCode==83){controller.lDown=keyS}
  }


  window.addEventListener("keydown", spill)
  window.addEventListener("keyup", spill)
let sum1=0;
let sum2=0;

  function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    if(controller.lUp && rect1.y>0){rect1.y-=rect1.dy;}
    if(controller.lDown  && rect1.y+rect1.h<canvas.height){rect1.y+=rect1.dy}
    if(controller.rDown && rect2.y+rect1.h<canvas.height){rect2.y+=rect2.dy}
    if(controller.rUp && rect2.y>0){rect2.y-=rect2.dy;}
    if(ball.x+ball.r>rect2.x && ball.y>rect2.y && ball.y<rect2.y+rect2.h){ball.dx=-ball.dx}
    if(ball.x -ball.r<rect1.x +20 &&  ball.y>rect1.y && ball.y<rect1.y+rect1.h){ball.dx=-ball.dx}
    if(ball.y +ball.r > canvas.height){ball.dy=-ball.dy}
    if(ball.y -ball.r < 0){ball.dy=-ball.dy}
    if(ball.x> rect2.x){
      sum1++; c.beginPath();
      ball.dx=0; ball.dy=0; ball.x=canvas.width/2; ball.y=canvas.height/2; ball.draw();
      rect1.h=300;rect2.h=300; rectUp=0;
    };
    if(rect1.h>40){rect1.h-=rectUp} ;
    if(rect2.h>40){rect2.h-=rectUp} ;


    if(ball.x< rect1.x+20){
         sum2++; c.beginPath();
         ball.dx=0; ball.dy=0; ball.x=canvas.width/2; ball.y=canvas.height/2; ball.draw();
       rect1.h=300;rect2.h=300; rectUp=0;}
  rectUpdate();
  rect1.draw();
  rect2.draw();
  ball.update();
  c.font= "30px monospace"
   c.fillText(sum1+":"+sum2, canvas.width/2, 100);

   if(sum1==10 || sum2==10){sum1=0; sum2=0;}
  }

animate();

  function space(event){
    if(event.keyCode==32&&ball.dx==0&&ball.dy==0){ball.dx=ra(); ball.dy=ra(); rectUp=0.1;}
  }

  window.addEventListener("keydown", space)
