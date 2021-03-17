///////////////////
// HTML OBJECTS // 
/////////////////
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fpsDiv = document.getElementById("fps");
const bodySelect = document.getElementById("bodySelect");

/////////////
// IMAGES //
///////////
const getImage = string =>{
    let image = new Image();
    let src;
    if(string.toLowerCase() == "mars") src = "mars.png.png";
    else if(string.toLowerCase() == "venus") src = "venus.png.png";
    else if(string.toLowerCase() == "jorda") src = "earth.png.png";
    else if(string.toLowerCase() == "sola") src = "sun.png";
    else if(string.toLowerCase() == "merkur") src = "mercury.png.png";
    else if(string.toLowerCase() == "neptun") src = "neptune.png.png";
    else if(string.toLowerCase() == "saturn") src = "saturn.png.png";
    else if(string.toLowerCase() == "uranus") src = "uranus.png.png";
    else if(string.toLowerCase() == "jupiter") src = "jupiter.png.png";
    else src = "standard-planet.png";

    image.src = "../images/" + src;
    return image;
}

//////////////
// CLASSES //
////////////
class Game {
    constructor() {
        this.speed = 500;
        this.deltaTime;
        this.isPaused = true;
        this.g = 6.67408e-11;
        this.celestialBodyArr = [];
        this.gameInterval;
        this.drawingInterval = 10;
        this.drawOnlyTarget;
        this.mouseX = 0;
        this.mouseY = 0;
        this.holdInterval;
        this.xOffset = 0;
        this.yOffset = 0;
        this.isMousePressed = false;
        this.xPrevious;
        this.yPrevious;
        this.scale = 10 / 70e8;
        this.radiusScale = 1;
        this.vectorScale = 1000 * this.radiusScale;
    }

    update = () => this.celestialBodyArr.forEach(body => body.update());
    draw = () => this.celestialBodyArr.forEach(body => body.draw());
    drawVectors = () => this.celestialBodyArr.forEach(body => body.drawVector());
    drawOrbits = () => this.celestialBodyArr.forEach(body => body.drawOrbit());
    drawNames = () => this.celestialBodyArr.forEach(body => body.drawName());
    changeSpeed = () => this.speed = parseFloat(document.getElementById("time").value);
    pauseInterval = () => this.isPaused = true;
    startInterval = () => this.isPaused = false;
}
let game = new Game();
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add = v => new Vector(this.x + v.x, this.y + v.y);
    sub = v => new Vector(this.x - v.x, this.y - v.y);
    mul = v => new Vector(this.x * v, this.y * v);
    div = v => new Vector(this.x / v, this.y / v);
    mag = () => Math.sqrt(this.x * this.x + this.y * this.y);
    setMag = strength => {
        let currentMag = this.mag();
        this.x = this.x * strength / currentMag;
        this.y = this.y * strength / currentMag;
    }
}
class CelestialBody {
    constructor(x, y, mass, radius, vx, vy, name, isImmovable) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(vx, vy);
        this.acc = new Vector(0, 0);
        this.mass = mass;
        this.r = radius;
        this.trail = [];
        this.name = name;
        this.held = false;
        this.isImmovable = isImmovable;
        this.sprite = getImage(this.name);
    }
    computeAcceleration = () => {
        let acc = new Vector(0, 0);
        if (this.isImmovable) {
            return acc;
        }
        game.celestialBodyArr.forEach(body => {
            if (body == this) {
                return;
            }
            let delta = body.pos.sub(this.pos);

            let strength = game.g * body.mass / Math.pow(delta.mag(), 2);

            delta.setMag(strength);
            acc = acc.add(delta);
        });

        return acc;
    }

    update = () => {
        this.acc = this.computeAcceleration();
        this.vel = this.vel.add(this.acc.mul(game.speed * game.deltaTime));
        this.pos = this.pos.add(this.vel.mul(game.speed * game.deltaTime));


        this.trail.push(this.pos);
        if (this.trail.length > 2000) {
            this.trail.shift();
        }
    }
    draw = () => {
        ctx.beginPath();
        ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height, toCanvasX(this.pos.x - this.r), toCanvasY(this.pos.y + this.r), this.r * game.scale * 2, this.r * game.scale * 2);
        ctx.closePath();
    }
    drawVector = () => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = this.r * game.scale * 0.008;
        if (game.drawOnlyTarget && game.target != this) return;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(this.pos.x), toCanvasY(this.pos.y));
        ctx.lineTo(toCanvasX(this.pos.x + this.vel.x * game.vectorScale), toCanvasY(this.pos.y + this.vel.y * game.vectorScale));
        ctx.stroke();
        ctx.closePath();
    }
    drawOrbit = () => {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2.5;
        if (!this.isImmovable) {
            if (game.drawOnlyTarget && game.target != this) return;
            for (let i = 1; i < this.trail.length; i++) {
                ctx.beginPath();
                ctx.moveTo(toCanvasX(this.trail[i - 1].x), toCanvasY(this.trail[i - 1].y));
                ctx.lineTo(toCanvasX(this.trail[i].x), toCanvasY(this.trail[i].y));
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    drawName = () => {
        ctx.fillStyle = 'white';
        const fontSize = 1 * game.scale * 70e8;
        ctx.font = fontSize + "px Arial";
        if (game.drawOnlyTarget && game.target != this) return;
        ctx.fillText(this.name, toCanvasX(this.pos.x + this.r) + 5, toCanvasY(this.pos.y + this.r) - 5);
    }
}


////////////////
// FUNCTIONS //
//////////////
const createCelestialBody = (x, y, m, r, vx, vy, n, isImmovable) => {
    game.celestialBodyArr.push(new CelestialBody(x, y, m, r, vx, vy, n, isImmovable));
    document.getElementById("bodySelect").innerHTML = "";
    for (let i = 0; i < game.celestialBodyArr.length; i++) document.getElementById("bodySelect").innerHTML += `<option value="${i}">${game.celestialBodyArr[i].name}</option>`;
}
const setBody = () => {
    let x = document.getElementById("xInput").value;
    let y = document.getElementById("yInput").value;
    let m = document.getElementById("massInput").value;
    let r = document.getElementById("radiusInput").value;
    if (!m == "") game.target.mass = parseFloat(m);
    if (!x == "") game.target.pos.x = parseFloat(x);
    if (!y == "") game.target.pos.y = parseFloat(y);
    if (!r == "") game.target.pos.r = parseFloat(r);
    document.getElementById("xInput").value = "";
    document.getElementById("yInput").value = "";
    document.getElementById("massInput").value = "";
    document.getElementById("radiusInput").value = "";
}
const createBody = () => {
    createCelestialBody(parseFloat(document.getElementById("createX").value), parseFloat(document.getElementById("createY").value), parseFloat(document.getElementById("createM").value), parseFloat(document.getElementById("createR").value) ,parseFloat(document.getElementById("createVX").value), parseFloat(document.getElementById("createVY").value), document.getElementById("createName").value, document.getElementById("createisImmovable").checked);
    document.getElementById("createX").value = "";
    document.getElementById("createY").value = "";
    document.getElementById("createM").value = "";
    document.getElementById("createR").value = "";
    document.getElementById("createVX").value = "";
    document.getElementById("createVY").value = "";
    document.getElementById("createName").value = "";
    document.getElementById("createisImmovable").checked = false;
}
const deleteBody = () => {
    game.celestialBodyArr.splice(game.celestialBodyArr.indexOf(game.target), 1);
    document.getElementById("bodySelect").options.remove(document.getElementById("bodySelect").selectedIndex)
}
const writeHeader = (header, output) => {
    document.getElementById("title").innerHTML = "";
    let i = 0;
    setInterval(() => {
        if (i < header.length) output.innerHTML += header.charAt(i);
        else {
            if (i % 2 == 0) output.innerHTML += "_";
            else output.innerHTML = output.innerHTML.replace("_", "");
        }
        i++
    }, 300);
}
const toCanvasX = x => (x - game.target.pos.x) * game.scale + canvas.width / 2 + game.xOffset;
const toCanvasY = y => -(y - game.target.pos.y) * game.scale + canvas.height / 2 + game.yOffset;
const fromCanvasX = x => (x - canvas.width / 2 - game.xOffset) / game.scale + game.target.pos.x;
const fromCanvasY = y => (y - canvas.height / 2 - game.yOffset) / -game.scale + game.target.pos.y;



const aphelionDist = 152.10e9; //meter
const aphelionSpeed = 29290; //m/s
const earthMass = 5.972e24 * 2; //kg
const earthRadius = 6.371e6 * game.radiusScale //meter
const sunRadius = 696340e3 * game.radiusScale; //meter
const sunMass = 1.9891e30; //kg
const moonDistanceToEarth = 3844e5;
const moonMass = 7.34767309e22; //kg
const moonRadius = earthRadius / 7 * game.radiusScale; //meter
const moonRelativeSpeed = 970; //m/s
const marsMass = 6.39e23 //kg
const marsDist = 227.94e9 //meter
const marsRadius = 3389.5e3 * game.radiusScale //meter
const marsSpeed = 24e3 //m/s
const mercuryMass = 3.285E23 //kg
const mercuryDist = 58e9 //meter
const mercuryRadius = 2.4397e4 * game.radiusScale //meter
const mercurySpeed = 47e3 //m/s
const venusMass = 4.867E24 //kg
const venusDist = 108e9 //meter
const venusRadius = 60518e2 * game.radiusScale //meter
const venusSpeed = 35.02e3 //m/s
const jupiterMass = 1.898E27 //kg
const jupiterDist = 778e9 //meter
const jupiterRadius = 69911e3 * game.radiusScale //meter
const jupiterSpeed = 13.07e3 //m/s
const saturnMass = 5.683e26 //kg
const saturnDist = 1.4e12 //meter
const saturnRadius = 58232e3 * game.radiusScale //meter
const saturnSpeed = 9.68e3 //m/s 
const uranusMass = 8.681e25 //kg
const uranusDist = 2.9e12 //meter
const uranusRadius = 25.362e6 * game.radiusScale //meter
const uranusSpeed = 6.83527778e3 //m/s
const neptuneMass = 1.024e26 //kg
const neptuneDist = 4.4758e12 //meter
const neptuneRadius = 24.622e6 * game.radiusScale //meter
const neptuneSpeed = 5430 //m/s
///////////////////
// DECLARATIONS //
/////////////////
writeHeader(document.getElementById("title").innerHTML, document.getElementById("title"));
createCelestialBody(0, 0, sunMass, sunRadius, 0, 0, 'Sola', false, 'yellow');
createCelestialBody(0, -aphelionDist, earthMass, earthRadius, aphelionSpeed, 0, 'Jorda', false);
createCelestialBody(0, -mercuryDist, mercuryMass, mercuryRadius, mercurySpeed, 0, 'Merkur', false);
createCelestialBody(0, -venusDist, venusMass, venusRadius, venusSpeed, 0, 'Venus', false);
createCelestialBody(0, -marsDist, marsMass, marsRadius, marsSpeed, 0, 'Mars', false, 'orange');
createCelestialBody(0, -jupiterDist, jupiterMass, jupiterRadius, jupiterSpeed, 0, 'Jupiter', false);
createCelestialBody(0, -saturnDist, saturnMass, saturnRadius, saturnSpeed, 0, 'Saturn', false);
createCelestialBody(0, -uranusDist, uranusMass, uranusRadius, uranusSpeed, 0, 'Uranus', false);
createCelestialBody(0, -neptuneDist, neptuneMass, neptuneRadius, neptuneSpeed, 0, 'Neptun', false);
game.target = game.celestialBodyArr[0];


//////////////////////
// EVENT LISTENERS //
////////////////////

canvas.addEventListener("mousemove", e => {
    if (game.isMousePressed) {
        game.xOffset += e.offsetX - game.xPrevious;
        game.yOffset += e.offsetY - game.yPrevious;

        game.xPrevious = e.offsetX;
        game.yPrevious = e.offsetY;
    } else {
        game.mouseX = fromCanvasX(e.offsetX);
        game.mouseY = fromCanvasY(e.offsetY);

        canvas.style.cursor = "auto";
        game.celestialBodyArr.forEach(body => {
            if (Math.sqrt(Math.pow(body.pos.x - game.mouseX, 2) + Math.pow(body.pos.y - game.mouseY, 2)) < body.r) {
                canvas.style.cursor = "pointer";
            }

            if (body.held) {
                body.pos.x = game.mouseX;
                body.pos.y = game.mouseY;
            }
        });
    }
});

canvas.addEventListener("mousedown", e => {
    //updating coordinates of last pressed location
    game.isMousePressed = true;
    game.xPrevious = e.offsetX;
    game.yPrevious = e.offsetY;


    game.celestialBodyArr.forEach(body => {
        if (Math.sqrt(Math.pow(body.pos.x - fromCanvasX(e.offsetX), 2) + Math.pow(body.pos.y - fromCanvasY(e.offsetY), 2)) < body.r) {
            //quickfix for at man ikke skal kunne dra canvas når man drar en planet
            game.isMousePressed = false;
            body.held = true;
        }
    });
});

canvas.addEventListener("mouseup", () => {
    game.isMousePressed = false;
    game.celestialBodyArr.forEach(body => body.held = false);
    clearInterval(game.holdInterval);
});

canvas.addEventListener("wheel", e => {
    game.scale -= e.deltaY * game.scale / 100;
    if (game.scale < 1e-10) {
        game.scale = 1e-10;
    }
})

//update target
bodySelect.addEventListener("change", () => {
    game.target = game.celestialBodyArr[bodySelect.selectedIndex];
    game.xOffset = 0;
    game.yOffset = 0;
});

let prevTime = 0;

const loop = (time = 0) => {
    game.deltaTime = time - prevTime;
    fpsDiv.innerHTML = "FPS: " + Math.round(1 / (game.deltaTime / 1000));
    prevTime = time;
    if (!game.isPaused) {
        game.update();
    }


    //tar hånd om target display
    if (game.target) {
        document.getElementById("targetMass").innerHTML = `Target Mass: ${game.target.mass} kg`;
        document.getElementById("targetRadius").innerHTML = `Target Radius: ${game.target.r.toExponential(2)} meters`;
        document.getElementById("targetPosX").innerHTML = `x: ${game.target.pos.x.toExponential(2)} meters`;
        document.getElementById("targetPosY").innerHTML = `y: ${game.target.pos.y.toExponential(2)} meters`;
        document.getElementById("targetVelocity").innerHTML = `Absolute velocity: ${game.target.vel.mag().toExponential(2)} m/s`;
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw();
    if (document.getElementById("vectorCheck").checked) {
        game.drawVectors();
    }
    if (document.getElementById("orbitCheck").checked) {
        game.drawOrbits();
    }
    if (document.getElementById("nameCheck").checked) {
        game.drawNames();
    }
    game.drawOnlyTarget = document.getElementById("onlyTargetCheck").checked;
    requestAnimationFrame(loop);
}
loop();