//////////////////////////
///// HTML ELEMENTS /////
////////////////////////
const canvas = document.getElementById("asteroidsCanvas");
const ctx = canvas.getContext("2d");
const timeEl = document.getElementById("time");
const endButton = document.getElementById("asteroidsEndButton");
const scoreEl = document.getElementById("scoreEl");



//////////////////////
///// INTERVALS /////
////////////////////
let update;
let createAsteroids;
let asteroidSpawnSpeed;
let gameTime;


const toRadians = d => Math.PI * d / 180;
const rotate = (arr2, deg) => {
    const d = toRadians(deg);
    return [
        arr2[0] * Math.cos(d) - arr2[1] * Math.sin(d),
        arr2[0] * Math.sin(d) + arr2[1] * Math.cos(d)
    ];
}

//////////////////////
///// VARIABLES /////
////////////////////
let time;
let asteroids = new Array; //Array med alle asteroidene på skjermen og som trengs å oppdateres
let asteroidInterval = 1500; //ms
let spaceship = {} //Alle variabler som omhandler spaceshippet



////////////////////
///// CLASSES /////
//////////////////
class Projectile {
    constructor(dirX, dirY, x, y) {
        this.x = x;
        this.y = y;
        this.vector = [dirX, dirY];
        this.speed = 10;
    }
    move() {
        this.x += this.speed * this.vector[0];
        this.y += this.speed * this.vector[1];
    }
    outsideBoundary() {
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) return true;
        else return false;
    }
    remove() {
        spaceship.projectiles.splice(spaceship.projectiles.indexOf(this), 1);
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}
class Asteroid { //Sier seg selv
    constructor(size, dx, dy, x, y, child) { //Størrelse, endring i x, endring i y, x posisjon, y posisjon
        this.size = size;
        this.dx = dx;
        this.dy = dy;
        this.x = x;
        this.y = y;
        this.edges = 5;
        this.vertices = [];
        this.child = child;
        this.score = this.child ? 50 : 100;
        for (let i = 1; i <= this.edges; i++) this.vertices.push([this.x + this.size * Math.cos(i * 2 * Math.PI / this.edges), this.y + this.size * Math.sin(i * 2 * Math.PI / this.edges)]);
    }
    draw() {
        this.vertices = [];
        for (let i = 1; i <= this.edges; i++) this.vertices.push([this.x + this.size * Math.cos(i * 2 * Math.PI / this.edges), this.y + this.size * Math.sin(i * 2 * Math.PI / this.edges)]);
        ctx.beginPath();
        ctx.moveTo(this.vertices[0][0], this.vertices[0][1]);
        for (let i = 0; i < this.vertices.length - 1; i++) ctx.lineTo(this.vertices[i + 1][0], this.vertices[i + 1][1]);
        ctx.lineTo(this.vertices[0][0], this.vertices[0][1]);
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'grey';
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
    outsideBoundary() {
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.ypos > canvas.height) return true;
        else return false;
    }
    remove() {
        asteroids.splice(asteroids.indexOf(this), 1);
    }
    checkIfshot() {
        spaceship.projectiles.forEach(projectile => {
            if (projectile.x < this.x + this.size && projectile.x > this.x - this.size && projectile.y < this.y + this.size && projectile.y > this.y - this.size) {
                spaceship.score += this.score;
                scoreEl.innerHTML = `Score: ${spaceship.score}`;
                this.split();
                this.remove();
                spaceship.projectiles.splice(spaceship.projectiles.indexOf(projectile), 1);
            }
        });
    }
    split() {
        if (this.child) return;
        let randomDx1 = Math.random() < 0.5 ? Math.floor(Math.random()) + 1 : (Math.floor(Math.random()) + 1) * -1;
        let randomDx2 = Math.random() < 0.5 ? Math.floor(Math.random()) + 1 : (Math.floor(Math.random()) + 1) * -1;
        asteroids.push(new Asteroid(this.size / 2, randomDx1 * 2, Math.random() * 3 * -1, this.x, this.y, true));
        asteroids.push(new Asteroid(this.size / 2, randomDx2 * 2, Math.random() * 3, this.x, this.y, true));
    }
}



//////////////////////
///// FUNCTIONS /////
////////////////////
const gameOver = time => { //Når spillet er over
    console.log("game over")
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillText(`Time: ${time}s`, canvas.width / 2 - 60, canvas.height / 2 + 30);
    ctx.fillText(`Score: ${spaceship.score}`, canvas.width / 2 - 80, canvas.height / 2 + 60);
    clearInterval(update);
    clearInterval(createAsteroids);
    clearInterval(asteroidSpawnSpeed);
    clearInterval(gameTime);
}
const startGame = () => { //Starter spillet
    clearInterval(update);
    clearInterval(createAsteroids);
    clearInterval(asteroidSpawnSpeed);
    clearInterval(gameTime);
    spaceship = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 15,
        rotation: 0,
        dx: 0,
        dy: 0,
        aX: 0,
        aY: 0,
        up: false,
        left: false,
        right: false,
        vertices: [],
        projectiles: [],
        edges: 3,
        score: 0,
        draw: () => {
            ctx.beginPath();
            ctx.moveTo(spaceship.x + spaceship.vertices[0][0], spaceship.y + spaceship.vertices[0][1]);
            for (let i = 1; i < 3; i++)
                ctx.lineTo(spaceship.x + spaceship.vertices[i][0], spaceship.y + spaceship.vertices[i][1]);

            ctx.lineTo(spaceship.x + spaceship.vertices[0][0], spaceship.y + spaceship.vertices[0][1]);

            ctx.fillStyle = 'red';
            ctx.strokeStyle = "grey";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        },
        shoot: () => spaceship.projectiles.push(new Projectile(spaceship.directionX, spaceship.directionY, spaceship.x, spaceship.y)),
    }

    spaceship.vertices = [];
    for (let i = 1; i <= 3; i++) spaceship.vertices.push([spaceship.size * Math.cos(i * 2 * Math.PI / spaceship.edges), spaceship.size * Math.sin(i * 2 * Math.PI / spaceship.edges)]);
    //Setter variabler til startverdier ved new game
    asteroidInterval = 3000;
    asteroids = new Array;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spaceship.draw();
    time = 0;



    //Setter intervaller
    update = setInterval(() => { //Updatefunksjonen som runner hele spillet

        //Clearer canvas og begynner å drawe
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (spaceship.left) {
            console.log("før", spaceship.vertices[0]);
            spaceship.rotation += -3; //Roterer 2 grader venstre
            for (let i = 0; i < spaceship.edges; i++) spaceship.vertices[i] = rotate(spaceship.vertices[i], -3);

            console.log("etter",spaceship.vertices[0]);
        }
        if (spaceship.right) {
            spaceship.rotation += 3; //Roterer 2 grader høyre
            for (let i = 0; i < spaceship.edges; i++) spaceship.vertices[i] = rotate(spaceship.vertices[i], 3);
        }

        //Sørger for at gradene alltid er mellom 0-360
        if (spaceship.rotation > 360) spaceship.rotation = 0;
        if (spaceship.rotation < 0) spaceship.rotation = 360;

        //Spaceship direksjonsvektorupdate
        spaceship.directionX = Math.cos(toRadians(spaceship.rotation));
        spaceship.directionY = Math.sin(toRadians(spaceship.rotation));

        //Akselererer i retning fremover
        if (spaceship.up) {
            spaceship.aX = spaceship.directionX * 0.4;
            spaceship.aY = spaceship.directionY * 0.4;
        } else {
            spaceship.dx *= 0.98;
            spaceship.dy *= 0.98;
            spaceship.aY = 0;
            spaceship.aX = 0;
        }

        let magnitude = Math.sqrt(Math.pow(spaceship.dx, 2) + Math.pow(spaceship.dy, 2));
        if (magnitude > 8) {
            magnitude = 8;
            let angle = Math.atan2(spaceship.dy, spaceship.dx);
            spaceship.dx = Math.cos(angle) * magnitude;
            spaceship.dy = Math.sin(angle) * magnitude;
        }

        //Oppdaterer fart
        spaceship.dx += spaceship.aX;
        spaceship.dy += spaceship.aY;

        //Oppdaterer posisjonen til spaceshipet
        spaceship.x += spaceship.dx;
        spaceship.y += spaceship.dy;

        //Sjekker om spaceshippet er utenfor canvas og setter den til riktig sted
        if (spaceship.x < 0) spaceship.x = canvas.width - spaceship.size;
        if (spaceship.x + spaceship.size > canvas.width) spaceship.x = 0;
        if (spaceship.y < 0) spaceship.y = canvas.height - spaceship.size;
        if (spaceship.y + spaceship.size > canvas.height) spaceship.y = 0;
        spaceship.projectiles.forEach(projectile => {
            projectile.move();
            if (projectile.outsideBoundary()) projectile.remove();
            projectile.draw();
        });
        asteroids.forEach(asteroid => { //Oppdaterer og tegner de individuelle asteroidene
            asteroid.move();
            asteroid.checkIfshot()
            //Sjekker om spaceship collider med en av asteroidene
            for (let i = 0; i < asteroid.vertices.length; i++) {
                for (let j = 0; j < spaceship.vertices.length; j++) {
                    if (asteroid.vertices[i + 1] && spaceship.vertices[j + 1]) {
                        if (getLineIntersection(asteroid.vertices[i][0], asteroid.vertices[i][1], asteroid.vertices[i + 1][0], asteroid.vertices[i + 1][1], spaceship.x + spaceship.vertices[j][0], spaceship.y + spaceship.vertices[j][1], spaceship.x + spaceship.vertices[j + 1][0], spaceship.y + spaceship.vertices[j + 1][1])) gameOver(time);
                    }
                    if (asteroid.vertices[i + 1] && !spaceship.vertices[j + 1]) {
                        if (getLineIntersection(asteroid.vertices[i][0], asteroid.vertices[i][1], asteroid.vertices[i + 1][0], asteroid.vertices[i + 1][1], spaceship.x + spaceship.vertices[j][0], spaceship.y + spaceship.vertices[j][1], spaceship.x + spaceship.vertices[0][0], spaceship.y + spaceship.vertices[0][1])) gameOver(time);
                    }
                    if (!asteroid.vertices[i + 1] && spaceship.vertices[j + 1]) {
                        if (getLineIntersection(asteroid.vertices[i][0], asteroid.vertices[i][1], asteroid.vertices[0][0], asteroid.vertices[0][1], spaceship.x + spaceship.vertices[j][0], spaceship.y + spaceship.vertices[j][1], spaceship.x + spaceship.vertices[j + 1][0], spaceship.y + spaceship.vertices[j + 1][1])) gameOver(time);
                    }
                }
            }

            //Fjerner asteroiden dersom den er utafor canvas
            if (asteroid.outsideBoundary()) asteroid.remove();

            asteroid.draw() //Tegner asteroidene
        });
        spaceship.draw();
    }, 20);
    createAsteroids = setInterval(() => { //Lager asteroider per tidsenhet
        let randomX = Math.random() < 0.5 ? 0 : canvas.width;
        let randomY = Math.floor(Math.random() * canvas.height);
        let randomSize = Math.floor(Math.random() * 60) + 45;
        let randomDx = randomX < 0.5 ? Math.floor(Math.random()) + 1 : (Math.floor(Math.random()) + 1) * -1;
        let randomDy = Math.random();
        asteroids.push(new Asteroid(randomSize, randomDx, randomDy, randomX, randomY, false));
    }, asteroidInterval);
    asteroidSpawnSpeed = setInterval(() => { //Speeder sakte opp hvor fort asteroider blir dannet
        asteroidInterval -= 50;
    }, 3000);
    gameTime = setInterval(() => { //Teller tiden
        time++;
    }, 1000);

    spaceship.draw();
}


////////////////////////////////
///// COLLISION DETECTION /////
//////////////////////////////
//Tatt fra nettet
function getLineIntersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    // ctx.beginPath();
    // ctx.moveTo(p0_x, p0_y)
    // ctx.lineTo(p1_x, p1_y)
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
    // ctx.closePath();
    // ctx.beginPath();
    // ctx.moveTo(p2_x, p2_y)
    // ctx.lineTo(p3_x, p3_y)
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
    // ctx.closePath();
    ctx.lineWidth = 1;
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;
    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
    if ((s >= 0 && s <= 1) && (t >= 0 && t <= 1)) return true // Collision detected;
}



////////////////////////////
///// EVENT LISTENERS /////
//////////////////////////
document.getElementById("asteroidsEndButton").addEventListener("click", startGame);
document.addEventListener("keydown", (e) => { //Sjekker for keydown
    if (e.key == "ArrowUp" || e.key == "w") spaceship.up = true;
    if (e.key == "ArrowLeft" || e.key == "a") spaceship.left = true;
    if (e.key == "ArrowRight" || e.key == "d") spaceship.right = true;
});
document.addEventListener("keyup", (e) => { //Sjekker for keyup
    if (e.key == "ArrowUp" || e.key == "w") spaceship.up = false;
    if (e.key == "ArrowLeft" || e.key == "a") spaceship.left = false;
    if (e.key == "ArrowRight" || e.key == "d") spaceship.right = false;
});
document.addEventListener("keypress", (e) => {
    if (e.key == " ") spaceship.shoot();
});



////////////////////////////
///// INITIALIZE GAME /////
//////////////////////////
startGame();

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
writeHeader(document.getElementById("title").innerHTML, document.getElementById("title"));

writeHeader(document.getElementById("title").innerHTML, document.getElementById("title"))