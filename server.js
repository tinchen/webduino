//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

//var async = require('async');
//var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var ejs = require('ejs-locals');
var router = express();
router.engine('ejs', ejs);
router.set('view engine', 'ejs');

router.get('/', function(req, res) {
    res.render('index.ejs', {
        title: 'Webduino Smart 按鈕控制變色＋長按重置',
        users: ['Kai', 'aYen', 'Kyousuke']
    });
});

router.get('/led', function(req, res) {
    var webduino = require('webduino-js');
    var board, led;

    board = new webduino.WebArduino('GLeq');

    board.on('ready', function() {
        led = new webduino.module.Led(board, board.getDigitalPin(10));
        led.on();
        res.send('led on');
    });
    board.on('error', function() {
        res.send('led error');
    });
});

// router.use(express.static(path.resolve(__dirname, 'client')));

var server = http.createServer(router);
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Simple Http server listening at", addr.address + ":" + addr.port);
});
