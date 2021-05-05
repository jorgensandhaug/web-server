const express = require("express")
const app = express()
const server = require("http").Server(app)

app.use(express.static("/home/sandhaug/web-server/public"));


const PORT = 8000
server.listen(PORT)

