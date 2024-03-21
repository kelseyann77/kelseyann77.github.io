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
let playerNamesArray = [];
let playingArray = [];


io.on("connection",(socket)=>{

    socket.on("find",(e)=>{

        if(e.name!=null){

            playerNamesArray.push(e.name);
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
            currentPlayer: e.currentPlayer, 
            board: e.board, 
            row: e.row,
            currentColumns: e.currentColumns
        });


    })

    socket.on("setWinner",(e)=>{

        // Extract data sent from the client
        const { winner } = e;
        const { winnerFound } = e;
        
        console.log( "winner: " + winner );

        // Send winner info to client
        io.emit("winner",{ winner: e.winner,
            winnerFound: e.winnerFound
        });

        console.log( "winner: " + e.winner );
        console.log( "winnerFound: " + e.winnerFound );

    })
        

    // How to handle player disconnections
    socket.on('disconnect', () => {
        // Display message of which player
        console.log("Player" + ' has disconnected');

        // Remove disconnected player
        players = players.filter(player => player !== socket);
    });



})

app.get("/",(req,res)=>{
    return res.sendFile("index.html")
});


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});