const express = require("express")
const app = express()
const server = require("http").Server(app)

app.get("/jorgen", (req, res) =>{
    res.sendFile("index.html", {root: ".../jorge/nettside-jorge/"});
})

app.get("/simen", (req, res) =>{
    res.sendFile("index.html", {root: ".../simen/nettside/"});
})

app.get("/", (req, res) =>{
    res.send("Home page");
})

const PORT = 80
server.listen(PORT)

