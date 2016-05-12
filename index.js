'use strict';

var http = require('http');
var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);

initExpress();
initRoutes();
createUploadsDir();
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

function createUploadsDir() {
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }
}

function startServer() {
    server.listen(port, onListen);
}

function onListen() {
    console.log('listening http on *:' + port);
}

module.exports = server;