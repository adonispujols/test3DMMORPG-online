const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var userIDCount = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    io.emit('userConnected', userIDCount);
    userIDCount += 1;


    socket.on('onKeyDown', function(key){
        var translateParams = {x:0, y:0, z:0, distance: 0}
        switch (key) {
            case "left":
                translateParams.x = 1;
                translateParams.distance = -.1;
                break;
            case "up":
                translateParams.z = 1;
                translateParams.distance = -.1;
                break;
            case "right":
                translateParams.x = 1;
                translateParams.distance = .1;
                break;
            case "down":
                translateParams.z = 1;
                translateParams.distance = .1;
                break;
        }
        io.emit('translateOnAxis', translateParams);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});