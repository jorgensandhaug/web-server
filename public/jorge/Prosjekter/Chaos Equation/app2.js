const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const w = canvas.width;
const h = canvas.height;


const n = 60;

let colorArr = [];
let trails = [];
for(let i = 0; i < n; i++){
    colorArr[i] = [Math.random()*255, Math.random()*255, Math.random()*255];
    trails[i] = [];
}


let previousPoints = [];

//kul 1
const fooX = (x, y, t) => t*t-x*y+x*t-x*x+y*y;
const fooY = (x, y, t) => t*t-x*t-y;

//kul 2
// const fooX = (x, y, t) => x*x-y*y-t*t-x-t;
// const fooY = (x, y, t) => y*y+t*t-x*y-y-t;

const startTime = -3;
const speed = 1;
const densitySlowDown = 1*Math.pow(10, 12);
const maxTrailLength = 150;
let numberOfPixelsDrawn = n*maxTrailLength;
let prevTime = 0;
let t = startTime;
function loop(time = 0){
    const deltaTime = time - prevTime;
    prevTime = time;

    const imageData = c.getImageData(0, 0, w, h);
    let pixels = imageData.data;
    //clear data
    for(let i = 0; i < pixels.length; i+=4){
        pixels[i] = 0; 
        pixels[i+1] = 0; 
        pixels[i+2] = 0; 
        pixels[i+3] = 255;
    }

    for(let k = 0; k < 4; k++){
        numberOfPixelsDrawn = 0;
        let x = t;
        let y = t;
        for(let i = 0; i < n; i++){
            x = fooX(x, y, t);
            y = fooY(x, y, t);
            const drawX = w/2 + x*300;
            const drawY = h/2 - y*300;

            addToTrail(i, drawX, drawY);
        }
        //console.log(trails.length)
        for(let i = 0; i < trails.length; i++){
            for(let j = 1; j < trails[i].length; j++){
                const x = trails[i][j][0];
                const y = trails[i][j][1];
                const xPrev = trails[i][j-1][0];
                const yPrev = trails[i][j-1][1];
                if(x < 0 || x >= w || y < 0 || y >= h || xPrev < 0 || xPrev >= w || yPrev < 0 || yPrev >= h) break;

            

                const index = (Math.floor(y)*w + Math.floor(x))*4;
                const r = colorArr[i][0]; 
                const g = colorArr[i][1];
                const b = colorArr[i][2];
                const alpha = 255-j/trails[i].length * 255;

                strokeLine(xPrev, yPrev, x, y, r, g, b, alpha, pixels)

                //fyller 4 pixler
                // pixels[index] = r;
                // pixels[index+1] =g;
                // pixels[index+2] = b;
                // pixels[index+3] = alpha;
            }
        }


        for(let i = 0; i < pixels.length; i+=4){
            if(pixels[i] != 0 || pixels[i+1] != 0 || pixels[i+2] != 0) {//not black
                numberOfPixelsDrawn++;
            }
        }

        //update time
        if(numberOfPixelsDrawn == 0) t = t + 0.003 * speed; 
        else t = t + speed * 0.02 * Math.min(100/60 / (Math.pow(numberOfPixelsDrawn, 4) / Math.pow(w*h, 4) * densitySlowDown), 1);
    }



    c.putImageData(imageData, 0, 0);

    c.fillStyle = "white";
    c.fillText("Time: " + t, 10, 20);
    c.fillText("nPixels: " + numberOfPixelsDrawn + "\t max: " + w*h, 10, 40);
    c.fillText("FPS: " + 1000/deltaTime, 10, 60);


    

    requestAnimationFrame(loop);
}

loop();




function strokeLine(x1, y1, x2, y2, r, g, b, a, pixels){
    const vec = [x2-x1, y2-y1];
    const dist = Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
    if(dist > 90) return;
    const oneDivDist = 1/dist;
    for(let i = 0; i <= dist; i++){
        const x = Math.floor(i*oneDivDist*vec[0] + x1);
        const y = Math.floor(i*oneDivDist*vec[1] + y1);

        const index = (y*w + x)*4;
       
        pixels[index] = r; 
        pixels[index+1] = g; 
        pixels[index+2] = b; 
        pixels[index+3] = a;
    }
}


function addToTrail(i, x, y){
    if(trails[i].length > 0){
        const xPrev = trails[i][0][0];
        const yPrev = trails[i][0][1];

        if(distance(xPrev, yPrev, x, y) < 1) return;
    }

    trails[i].unshift([x, y]);
    if(trails[i].length > maxTrailLength) trails[i].pop();
}



function distance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}
