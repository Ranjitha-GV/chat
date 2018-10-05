var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var router = express.Router();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io')(server);//--------
var users=require("/home/administrator/Desktop/chatApp/server/controller/controller.js");
var router = require('./server/router/router.js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

app.use('/', router);
app.use(express.static('./public'));

io.on('connection', function (client) {
    console.log("system working")
    client.on('disconnect',function () {
        console.log("socket disconnected");
    })
   

client.on('tobackend',function (data) {
    users.addtodb(data.userid, data.username,data.message,data.date);
    io.emit('tofrontend',data)
})

client.on('singleChatBackend',function(data){
    console.log(data.receiverId);
    
    users.peerMessages(data.senderId,data.senderName,data.receiverId,data.receiverName,data.message,data.date)
    io.emit(data.receiverId,data);
})

})

server.listen(4000);
console.log("Listening to PORT 4000");