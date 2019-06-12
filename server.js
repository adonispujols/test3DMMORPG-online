const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('sentID', function(userID) {
        io.emit('userJoined', userID);
    });

    socket.on('onKeyDown', function(data) {
        var translateParams = {x: 0, y: 0, z: 0, distance: 0}
        switch (data.key) {
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
        io.emit('translateOnAxis', {translateParams: translateParams, userID: data.userID});
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});