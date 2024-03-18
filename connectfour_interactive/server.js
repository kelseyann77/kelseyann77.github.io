const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

// app.use( (req, res, next) => { 
// 	console.log('Time:', Date.now()) 
//    next() 
// })

// Track connected players
let players = [];

// When a user connects to the server,
// the server will handle the client but serving them back the index.html page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    // console.log('A user connected');
    // console.log('Time:', Date.now());

    // Assign player numbers
    let playerNumber = players.length + 1;
    players.push(socket);

    socket.emit('playerNumber', playerNumber); // Send player number to the client
    console.log("Player " + playerNumber + " has joined");

    // if (players.length === 2) {
    //     // If two players are connected, let them know the game can start
    //     io.emit('gameStart');
    // }

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        // Display message of which player
        console.log("Player " + playerNumber + ' has disconnected');

        // Remove disconnected player
        players = players.filter(player => player !== socket);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});