const express = require("express")
const app = express()
const server = require("http").Server(app)

app.use(express.static("public"));


const PORT = 8000
server.listen(PORT)

