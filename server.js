const express = require("express")
const app = express()
const server = require("http").Server(app)

app.get("/jorgen", (req, res) =>{
    res.sendFile("home/sandhaug/jorge/nettside-jorge/index.html");
})

app.get("/simen", (req, res) =>{
    res.sendFile("home/sandhaug/simen/nettside/index.html");
})

app.get("/", (req, res) =>{
    res.send("Home page");
})

const PORT = 80
server.listen(PORT)

