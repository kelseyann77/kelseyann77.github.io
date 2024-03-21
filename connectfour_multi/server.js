const express=require("express");
const app=express();

const path=require("path");
const http=require("http");
const {Server}=require("socket.io");


const server=http.createServer(app);

const io=new Server(server);
app.use(express.static(path.resolve("")));

// // Track connected players
let players = [];

// Store player names
let arr=[];
let playingArray=[];


io.on("connection",(socket)=>{

    // Assign player numbers
    let playerNumber = players.length + 1;
    players.push(socket);

    // Send player number to the client
    socket.emit('playerNumber', playerNumber); 
    console.log("Player " + playerNumber + " has joined");

    socket.on("find",(e)=>{

        if(e.name!=null){

            arr.push(e.name);

            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0],
                    p1value:"RED",
                    p1move:""
                }
                let p2obj={
                    p2name:arr[1],
                    p2value:"YELLOW",
                    p2move:""
                }

                let obj={
                    p1:p1obj,
                    p2:p2obj,
                    sum:1
                }
                playingArray.push(obj);

                arr.splice(0,2);

                io.emit("find",{allPlayers:playingArray});

            }

        }

    })

    // How to handle player disconnections
    socket.on('disconnect', () => {
        // Display message of which player
        console.log("Player " + playerNumber + ' has disconnected');

        // Remove disconnected player
        players = players.filter(player => player !== socket);
    });

    // socket.on("playing",(e)=>{
    //     if(e.value=="X"){
    //         let objToChange=playingArray.find(obj=>obj.p1.p1name===e.name)

    //         objToChange.p1.p1move=e.id
    //         objToChange.sum++
    //     }
    //     else if(e.value=="O"){
    //         let objToChange=playingArray.find(obj=>obj.p2.p2name===e.name)

    //         objToChange.p2.p2move=e.id
    //         objToChange.sum++
    //     }

    //     io.emit("playing",{allPlayers:playingArray})

    // })

    // socket.on("gameOver",(e)=>{
    //     playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.name)
    //     console.log(playingArray)
    //     console.log("lol")
    // })


})




app.get("/",(req,res)=>{
    return res.sendFile("index.html")
});

// server.listen(3000,()=>{
//     console.log("port connected to 3000")
// });

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// // const express = require('express');
// // const app = express();

// // const path=require("path");
// // const http=require("http");
// // const {Server}=require("socket.io");

// // const server = require('http').createServer(app);
// // const io = new Server(server);

// // app.use(express.static(path.resolve("")));

// const express=require("express")
// const app=express()

// const path=require("path")
// const http=require("http")
// const {Server}=require("socket.io")


// const server=http.createServer(app)

// const io=new Server(server)
// app.use(express.static(path.resolve("")))

// let arr=[];
// let playingArray=[];

// // Track connected players
// let players = [];



// io.on('connection', (socket) => {

//     // Assign player numbers
//     let playerNumber = players.length + 1;
//     players.push(socket);

//     socket.emit('playerNumber', playerNumber); // Send player number to the client
//     console.log("Player " + playerNumber + " has joined");

//     // if (players.length === 2) {
//     //     // If two players are connected, let them know the game can start
//     //     io.emit('gameStart');
//     // }

//     // socket.on('message', (message) => {
//     //     io.emit('message', message);
//     // });

//     socket.on('disconnect', () => {
//         // Display message of which player
//         console.log("Player " + playerNumber + ' has disconnected');

//         // Remove disconnected player
//         players = players.filter(player => player !== socket);
//     });
// });

// io.on("connection",(socket)=>{

//     socket.on("find",(e)=>{

//         if(e.name!=null){

//             arr.push(e.name);

//             if(arr.length>=2){
//                 let p1obj={
//                     p1name:arr[0],
//                     p1value:"X", // X for tic tac toe, so red for connect4
//                     p1move:"" // Tells which buttons for tic tac toe have been clicked
//                 }
//                 let p2obj={
//                     p2name:arr[1],
//                     p2value:"O", // O for tic tac toe, so yellow for connect4
//                     p2move:"" // Tells which buttons for tic tac toe have been clicked
//                 }

//                 let obj={
//                     p1:p1obj,
//                     p2:p2obj,
//                     sum:1
//                 }
//                 playingArray.push(obj);

//                 // Once 2 players are connected, they will be removed from arr
//                 arr.splice(0,2); 

//                 // Send data to client
//                 io.emit("find",{allPlayers:playingArray});

//             }

//         }

//     })

//     socket.on("playing",(e)=>{
//         if(e.value=="X"){
//             let objToChange=playingArray.find(obj=>obj.p1.p1name===e.name)

//             objToChange.p1.p1move=e.id
//             objToChange.sum++
//         }
//         else if(e.value=="O"){
//             let objToChange=playingArray.find(obj=>obj.p2.p2name===e.name)

//             objToChange.p2.p2move=e.id
//             objToChange.sum++
//         }

//         io.emit("playing",{allPlayers:playingArray})

//     })

//     socket.on("gameOver",(e)=>{
//         playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.name)
//         console.log(playingArray)
//         console.log("lol")
//     })


// })

// // When a user connects to the server,
// // the server will handle the client by serving them back the index.html page
// app.get("/", function(req, res) {
//     return res.sendFile(__dirname + "/index.html");
// })

// // app.use( (req, res, next) => { 
// // 	console.log('Time:', Date.now()) 
// //    next() 
// // })



// function hostCreateNewGame() {
//     // Create a unique Socket.IO Room
//     var thisGameId = ( Math.random() * 100000 ) | 0;

//     // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
//     this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

//     // Join the Room and wait for the players
//     this.join(thisGameId.toString());
// }

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });