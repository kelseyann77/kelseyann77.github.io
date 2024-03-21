const express=require("express");
const app=express();

const path=require("path");
const http=require("http");
const {Server}=require("socket.io");
const e = require("express");


const server=http.createServer(app);

const io=new Server(server);
app.use(express.static(path.resolve("")));

// // Track connected players
let players = [];

// Store player names into arr array
let playerNamesArray = []; // originally arr
let playingArray = [];
// let playerIndex;
// let p1or2;


io.on("connection",(socket)=>{

    // Assign player numbers
    let playerNumber = players.length + 1;
    players.push(socket);

    // // Send player number to the client
    // socket.emit('playerNumber', playerNumber); 
    // console.log("Player " + playerNumber + " has joined");

    socket.on("find",(e)=>{

        if(e.name!=null){
            
            // playerIndex = (playerNamesArray.indexOf(e.name) + 1 );
            // if ( playerIndex % 2 == 1 ) {
            //     p1or2 = "Player 1";
            // }
            // else {
            //     p1or2 = "Player 2";
            // }

            playerNamesArray.push(e.name);
            console.log( )
            console.log( e.name + " has connected" );

            if(playerNamesArray.length>=2){
                let p1obj={
                    p1name:playerNamesArray[0],
                    p1value:"RED",
                    p1move:""
                }
                let p2obj={
                    p2name:playerNamesArray[1],
                    p2value:"YELLOW",
                    p2move:""
                }

                let obj={
                    p1:p1obj,
                    p2:p2obj,
                    sum:1
                }
                playingArray.push(obj);

                // Get rid of players after they've been assigned to a game
                playerNamesArray.splice(0,2);

                // Send playingArray info to client
                io.emit("find",{allPlayers:playingArray});

            }

        }

    })

    socket.on("setPiece",(e)=>{

        // Extract data sent from the client
        const { tile, currentPlayer, username, row } = e;
        
        console.log( "tile: " + tile );
        console.log( "currentPlayer: " + currentPlayer );
        console.log( username );
        
        if(e.currentPlayer==1){
            let objToChange=playingArray.find(obj=>obj.p1.p1name===e.username);

            objToChange.p1.p1move=e.tile;
            objToChange.sum++;
        }
        
        else if (e.currentPlayer==2) {
            let objToChange=playingArray.find(obj=>obj.p2.p2name===e.username);

            objToChange.p2.p2move=e.tile;
            objToChange.sum++;
        }

        // Send playingArray info to client
        io.emit("setPiece",{allPlayers:playingArray, 
            currentplayer: e.currentplayer, 
            board: e.board, 
            row: e.row,
            currentColumns: e.currentColumns
        });

        // console.log ("playingArray" + playingArray);

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
