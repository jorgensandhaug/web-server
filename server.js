const express = require("express")
const app = express()
const server = require("http").Server(app)

app.get("/jorge", (req, res) =>{
    res.sendFile("index.html", {root: "/home/sandhaug/jorge/nettside-jorgen/"});
})

app.get("/simen", (req, res) =>{
    res.sendFile("index.html", {root: "/home/sandhaug/simen/nettside/"});
})

app.get("/", (req, res) =>{
    res.send("Home page");
})


const routes = [
    ("jorge", "sound_visualizer", "nettside-jorgen/Prosjekter/SoundVisualizer"),
    ("jorge", "tetris", "nettside-jorgen/Prosjekter/Tetris"),
    ("jorge", "tank", "nettside-jorgen/Prosjekter/Tank, A Fullfilling Gaming Experience"),
    ("jorge", "tegneprogram", "nettside-jorgen/Prosjekter/Drawing"),
    ("jorge", "platformer", "nettside-jorgen/Prosjekter/Platformer")
    ];

routes.forEach( tup =>{
    const [site, name, path] = tup;
    app.get("/"+site+"/"+name+"/"+path, (req, res) =>{
        res.sendFile("index.html", {root: "/home/sandhaug/"+site+"/"+path+"/"});
    })
})

















const PORT = 80
server.listen(PORT)

