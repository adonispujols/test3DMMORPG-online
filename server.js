var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('onKeyDown', function(key){
        switch (key) {
            case "left":
                var translateParams = {x:1, y:0, z:0, distance: -.1}
                io.emit('translateOnAxis', translateParams);
                break;
            case "up":
                break;
            case "right":
                break;
            case "down":
                break;
        }
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});