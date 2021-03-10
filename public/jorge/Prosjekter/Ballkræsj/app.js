var canvas= document.getElementById('canvas');
var c= canvas.getContext("2d");
function size(){
canvas.width= window.innerWidth-40;
canvas.height=window.innerHeight-40;
}
size();

function rotate(fart, angle) {
    const rotatedVelocities = {
        x: fart.x * Math.cos(angle) - fart.y * Math.sin(angle),
        y: fart.x * Math.sin(angle) + fart.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function kollisjon(particle, otherParticle) {
    const xVelocityDiff = particle.fart.x - otherParticle.fart.x;
    const yVelocityDiff = particle.fart.y - otherParticle.fart.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.fart, angle);
        const u2 = rotate(otherParticle.fart, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final fart after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.fart.x = vFinal1.x;
        particle.fart.y = vFinal1.y;

        otherParticle.fart.x = vFinal2.x;
        otherParticle.fart.y = vFinal2.y;
    }
}






function Circle(x, y, r, f){
  this.x = x,
  this.y= y,
  this.r=r,
  this.f=f,
  this.alpha= 0.1,
  this.fart= {
    x: Math.random()*2-1,
    y: Math.random()*2-1,
  },

  this.mass=1

  this.draw= function(){
    c.beginPath();
    c.strokeStyle= this.f;
    c.fillStyle= this.f;
    c.globalAlpha= 0.1;
    c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    c.stroke();
    c.globalAlpha= this.alpha;
    c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    c.fill();

  }

  this.update= function(){
    this.x+=this.fart.x;
    this.y+=this.fart.y;
    if(this.x+this.r>=canvas.width || this.x-this.r<=0){
      this.fart.x=-this.fart.x;
    }
    if(this.y+this.r>=canvas.height || this.y-this.r<=0){
      this.fart.y=-this.fart.y;
    }

    if(distance(mouse.x, mouse.y, this.x, this.y)<100){if(this.r<r*7){this.r+=5;}; if(this.alpha<1){this.alpha+=0.01}}
    else{if(this.r>r){this.r-=5;}; if(this.alpha>0.1){this.alpha-=0.005}}

    for(var i=0; i<sirkelArr.length; i++){
      if(this===sirkelArr[i]){continue;}
      if(distance(this.x, this.y, sirkelArr[i].x, sirkelArr[i].y)< this.r + sirkelArr[i].r){
        kollisjon(this, sirkelArr[i])
      }
    }


    this.draw();
  }
}

var mouse= {
  x: undefined,
  y: undefined
}

window.addEventListener("mousemove", function(event){
  mouse.x= event.x; mouse.y = event.y;
  }
)



// var fargeArr=["#12355B", "#D72638", "#FF570A", "#3F826D", "#A9FFF7"]
var fargeArr=["rgba(65, 168, 241, 1)", "rgba(217, 38, 122, 1)", "rgba(255, 130, 41, 1)", "rgba(0, 219, 161, 1)", "rgba(255, 253, 158, 1)"]
var sirkelArr=[]
var rArr=[]

function distance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
}




for(var i=0; i<300; i++){
  const r=Math.random()*10+10
  let x=Math.random()* (canvas.width-2*r)+ r;
  let y=Math.random()* (canvas.height-2*r)+ r;
  let f= fargeArr[Math.floor(Math.random()*fargeArr.length)]
  for(var j=0; j<sirkelArr.length; j++){
if(distance(x, y, sirkelArr[j].x, sirkelArr[j].y)< sirkelArr[j].r+r){
  x=Math.random()* (canvas.width-2*r)+ r;
  y=Math.random()* (canvas.height-2*r)+ r;
  j=-1
}
  }

  sirkelArr.push(new Circle(x, y, r, f))
}



function animate(){
  requestAnimationFrame(animate);
  // c.fillStyle= "rgb(255, 255, 255, 0.2)"
  // c.fillRect(0, 0, canvas.width, canvas.height)
c.clearRect(0, 0, innerWidth, innerHeight);
  for(var i=0; i<sirkelArr.length; i++){
    sirkelArr[i].update();
  }

//tekst
c.fillText(canvas.width/2, canvas.height/2, "HEiu")
c.fill();



}
animate();


window.addEventListener("resize", size);
