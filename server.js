const express = require("express")
const app = express()
const server = require("http").Server(app)

app.get("/jorgen", (req, res) =>{
    res.sendFile("index.html", {root: "/home/sandhaug/jorge/nettside-jorge/"});
})

app.get("/simen", (req, res) =>{
    res.sendFile("index.html", {root: "/home/sandhaug/simen/nettside/"});
})

app.get("/", (req, res) =>{
    res.send("Home page");
})

const PORT = 80
server.listen(PORT)

