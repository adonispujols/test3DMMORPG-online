var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('onKeyDown', function(key){
        var translateParams = {x:0, y:0, z:0, distance: 0}
        switch (key) {
            case "left":
            console.log("LEEEFT");
                translateParams.x = 1;
                translateParams.distance = -.1;
                break;
            case "up":
            console.log("UPPPPP");
                translateParams.z = 1;
                translateParams.z = -.1;
                break;
            case "right":
                translateParams.x = 1;
                translateParams.distance = .1;
                break;
            case "down":
                translateParams.z = 1;
                translateParams.z = .1;
                break;
        }
        io.emit('translateOnAxis', translateParams);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});