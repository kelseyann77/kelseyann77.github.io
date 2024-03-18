const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// app.use( (req, res, next) => { 
// 	console.log('Time:', Date.now()) 
//    next() 
// })

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    console.log('Time:', Date.now())

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        console.log('Time:', Date.now())
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});