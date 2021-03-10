const express = require("express")
const app = express()
const server = require("http").Server(app)

app.get("/jorgen", (req, res) =>{
    res.sendFile("~/jorge/nettside-jorgen/index.html");
})

app.get("/simen", (req, res) =>{
    res.sendFile("~/simen/nettside/index.html");
})

const PORT = 80
server.listen(PORT)

