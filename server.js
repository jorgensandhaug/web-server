// const express = require("express")
// const app = express()
// const server = require("http").Server(app)

// app.use(express.static("public"))
// app.use(express.urlencoded({ extended: true }))

// const PORT = 80
// server.listen(PORT)


// Require diet
var server = require('diet');

// Main domain
var app = server()
app.listen('http://example.com/')
app.get('/', function($){
    $.end('hello world ')
})

// Sub domain
var sub = server()
sub.listen('http://subdomain.example.com/')
sub.get('/', function($){
    $.end('hello world at sub domain!')
})

// Other domain
var other = server()
other.listen('http://other.com/')
other.get('/', function($){
    $.end('hello world at other domain')
})
