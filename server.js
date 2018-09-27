var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var router = express.Router();
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));


var router = require('./server/router/router.js')
app.use('/', router);
app.use(express.static('./public'));

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(3000);

app.get('/',function(req,res){res.sendFile(__dirname,'/index.html');
})

//open connection
io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('connected');
})

connections.splice(connections.indexof(socket),1);
console.log('Disconnected');
app.listen(4000);
console.log("Listening to PORT 4000");


