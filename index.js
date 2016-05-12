'use strict';

var http = require('http');
var express = require('express');
var busboy = require('connect-busboy');

var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);

initExpress();
initRoutes();
startServer();

function initExpress() {
    app.set('json spaces', 4);
    app.set('views', './views');
    app.set('view engine', 'ejs');
    app.use(busboy());
}

function initRoutes() {
    app.use('/', require('./routes/list'));
}

function startServer() {
    server.listen(port, onListen);
}

function onListen() {
    console.log('listening http on *:' + port);
}

module.exports = server;