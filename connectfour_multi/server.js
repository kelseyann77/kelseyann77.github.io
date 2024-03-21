const express=require("express");
const app=express();

const path=require("path");
const http=require("http");
const {Server}=require("socket.io");
const e = require("express");


const server=http.createServer(app);

const io=new Server(server);
app.use(express.static(path.resolve("")));

// Track connected players
let players = [];

// Store players' names
let playerNamesArray = [];

// Store object array containing real-time play information
let playingArray = [];

io.on("connection",(socket)=>{

    socket.on("find",(e)=>{

        if(e.name!=null){

            // When a player connects, obtain their name
            // and push it into the playerNamesArray
            playerNamesArray.push(e.name);

            // Display who has connected
            console.log( e.name + " has connected" );

            // Once a player is connected to the server,
            // match them with the next person who joins
            if(playerNamesArray.length>=2){

                // p1move and p2move will contain the ids of the tiles
                // the players occupy
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

                // Player 1 and 2 data will be stored in an object
                // which will be stored in an object array called playingArray
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
        
        console.log( "player " + currentPlayer + " (" + username + ")"+ " has occupied tile " + tile );
        
        // Change data according to which player set a piece down
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

        // Send winner info to client
        io.emit("winner",{ winner: e.winner,
            winnerFound: e.winnerFound
        });

        if ( e.winnerFound == 1 ) {
            console.log( "We found a winner!" );
            console.log( "The winner is player " + winner );
        }

    })
        

    // How to handle player disconnections
    socket.on('disconnect', (e) => {
        // Display message of which player
        console.log( "A player has disconnected");

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