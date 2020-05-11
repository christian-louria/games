var express = require("express");
var socket = require("socket.io");
const unoCreate = require("./routes/Uno/unoCreate");
const unoJoin = require("./routes/Uno/unoJoin");
const unoInfo = require('./routes/Uno/unoInfo')
const startUnoGame = require('./routes/Uno/startGame')
const playUnoCard = require('./routes/Uno/playCard')
const playDrawCard = require('./routes/Uno/drawCard')
const unoColorPicker = require('./routes/Uno/colorPicker')
const selfCallUno = require('./routes/Uno/selfCallUno')
const attackUno = require('./routes/Uno/attackUno')
const sortCards = require('./routes/Uno/sortCards')


var cache = require('memory-cache');
var Initializer = require('./model/Initializer')


var app = express();
var server = app.listen(4000, function() {
    const temp = new Initializer();
    cache.put('initializer', temp);
    console.log("Starting Server")
});

app.use(function (req, res, next) {
    console.log('middleware');
    res.end()
});

var io = socket(server);


io.on('connection', function(socket) {
    console.log("Socket Connected " + socket.id)

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('uno', (data) => {
        if (data["data"] === "create") {
            unoCreate(socket, io, data);
        } else if(data["data"] === "join") {
            unoJoin(socket, io, data);
        } else if (data['data'] === "info") {
            unoInfo(socket, io, data);
        } else if (data['data'] === "start") {
            startUnoGame(socket, io, data);
        } else if (data['data'] === "play") {
            playUnoCard(socket, io, data);
        } else if (data["data"] === "draw"){
            playDrawCard(socket, io, data);
        } else if (data["data"] === "changeColor"){
            unoColorPicker(socket, io, data);
        } else if (data["data"] === "selfUno"){
            selfCallUno(socket, io, data);
        } else if (data["data"] === "attackUno"){
            attackUno(socket, io, data);
        } else if (data["data"] === "sortCards"){
            sortCards(socket, io, data);
        }
    })

    socket.on('ticTacToe', (data) => {
        if (data["data"] === "newPrivate") {

        } else if(data["data"] === "leaveGame") {

        } else if(data["data"] === "makeMove") {

        } else if(data["data"] === "joinGame") {

        } else if(data["data"] === "resetGame") {

        }


        io.sockets.emit('chat', data);
    })

})

