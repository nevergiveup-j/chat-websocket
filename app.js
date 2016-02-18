var express = require('express');
var app = express();
var io = require('socket.io')(3001);
var open = require("open");

app.get('/', function(req, res){
  res.sendfile('views/index.html');
});

// 打开链接
open('http://127.0.0.1:3000/');

app.listen(3000);

// 聊天室
var _tmpData = [];

io.on('connection', function(socket) {
  socket.emit('join', _tmpData);

  socket.on('new message', function(data) {
    console.log(data);

    _tmpData.push(data);

    io.emit('message', [data]);
  });

});



module.exports = app;
