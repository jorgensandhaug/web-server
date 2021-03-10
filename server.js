const express = require("express")
const app = express()
const server = require("http").Server(app)

app.use(express.static("public"));


const PORT = 80
server.listen(PORT)

