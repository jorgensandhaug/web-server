const canvas = document.getElementById("panCanvas");
const ctx = canvas.getContext("2d");
let interval = 3000;
const images = [{
        name: 'mercury',
        pos: -150,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'venus',
        pos: 110,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'earth',
        pos: -150,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'hubble',
        pos: -150,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'mars',
        pos: 110,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'roadster',
        pos: 110,
        sizeX: 20,
        sizeY: 20,
        timing: 500,
    },
    {
        name: 'jupiter',
        pos: -150,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'saturn',
        pos: 110,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'uranus',
        pos: -150,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
    {
        name: 'neptune',
        pos: 110,
        sizeX: 20,
        sizeY: 20,
        timing: 4000,
    },
];
let currentImg = 0;
const planets = [];
class Planet {
    constructor(pos, sizeX, sizeY, name) {
        this.pos = pos;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.name = name;
    }
}
setInterval(() => {
    currentImg += (currentImg == images.length) ? -images.length : 1;
    interval = images[currentImg].timing;
    let planet = new Planet(images[currentImg].pos, images[currentImg].sizeX, images[currentImg].sizeY, images[currentImg].name);
    planets.push(planet);
}, interval);
planets.push(new Planet(images[0].pos, images[0].sizeX, images[0].sizeY, images[0].name));
const drawCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < planets.length; i++) {
        let img = new Image;
        img.src = `/images/${planets[i].name}.png.png`;
        if (planets[i].sizeY > 700) planets.splice(i, 1);
        else {
            planets[i].sizeX += 0.5;
            planets[i].sizeY += 0.5;
            if (Math.sign(planets[i].pos) == 1) planets[i].pos += 0.4;
            else planets[i].pos -= 0.85;
        }
        ctx.drawImage(img, canvas.width / 2 + planets[i].pos, canvas.height / 2 - 400, planets[i].sizeX, planets[i].sizeY);
    }
}
setInterval(() => {drawCanvas()}, 1);