var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 8081;

app.use(express.static(__dirname));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('messages', (data) => {
        socket.emit('broad', data);
        socket.broadcast.emit('broad', data);
    });
});

server.listen(port);
console.log('Listening on port ' + port);

