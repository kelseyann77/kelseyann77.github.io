// Hide the following content from the user when they first open the page
document.getElementById("loading").style.display = "none";
document.getElementById("some_content").style.display = "none";
document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";
document.getElementById("board").style.display = "none";
document.getElementById("announce").style.display = "none";
document.getElementById("colorCont").style.display = "none";
document.getElementById("whosTurn").style.display = "none";

const socket = io();

let username;

// When user clicks on "Search for Opponent" button
document.getElementById('find').addEventListener("click", function () {
    username = document.getElementById("name").value;
    document.getElementById("user").innerText = username;
    if (username == null || username == '') {
        alert("Please enter a name");
    }
    else {

        socket.emit("find", { name: username });

        document.getElementById("loading").style.display = "flex";
        document.getElementById("find").disabled = true;

    }
});

let clientPlayer;

socket.on("find", (e) => {

    // get allPlayers data from server
    let allPlayersArray = e.allPlayers;

    if (username != '') {

        // Load the game
        setGame();

        // Hide the following content from the user 
        // after they enter a name
        document.getElementById("loading").style.display = "none";
        document.getElementById("name").style.display = "none";
        document.getElementById("find").style.display = "none";
        document.getElementById("enterName").style.display = "none";
        document.querySelector(".gif-container").remove();

        // Load the following content from the user 
        // after they enter a name
        document.getElementById("some_content").style.display = "block";
        document.getElementById("board").style.display = "flex";
        document.getElementById("userCont").style.display = "block";
        document.getElementById("oppNameCont").style.display = "block";
        document.getElementById("colorCont").style.display = "block";
        document.getElementById("announce").style.display = "block";
        document.getElementById("announce").innerText = "It's your turn RED";

    }

    let oppName; // opponent name
    let colorValue; // red or yellow

    // Match the name given to either the user or the opponent
    const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${username}` || obj.p2.p2name == `${username}`);
    
    // Assign the user's name, their opponent's name, and their color value
    if ( foundObject.p1.p1name == `${username}`) {
        oppName = foundObject.p2.p2name;
        colorValue = foundObject.p1.p1value;
        clientPlayer = player1;
    }
    else {
        oppName = foundObject.p1.p1name;
        colorValue = foundObject.p2.p2value;
        clientPlayer = player2;
    }

    // Assign Opponent's name
    document.getElementById("oppName").innerText = oppName;

    // Assign the user's player color
    document.getElementById("colorvalue").innerText = colorValue;


})

// Set global variables
var player1 = 1;
var player2 = 2;

var p1turn = "It's your turn, RED";
var p2turn = "It's your turn, YELLOW";

var currentPlayer = player1;
var gameOver = false;

var board;
var currentColumns;

var rows = 6;
var columns = 7;

// This function sets up the game
function setGame() {

    // Clear existing tiles before creating new ones
    document.getElementById("board").innerHTML = "";

    gameOver = false;
    
    // Create the array for the entire board
    board = [
        [ 0, 0, 0, 0, 0, 0, 0 ], 
        [ 0, 0, 0, 0, 0, 0, 0 ], 
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
    ];

    // Since the pieces need to show up at the bottom of the board,
    // we will set the current columns to the last row (5)
    currentColumns = [ 5, 5, 5, 5, 5, 5, 5 ];

    // Create a for loop that will loop through all the tiles
    for ( let r = 0; r < rows; r++ ) {
        for ( let c = 0; c < columns; c++ ) {
            // Create HTML to add <div id="0-0" class="tile"></div>
            // inside the board
            let tile = document.createElement( "div" );

            // the ids will look like: 0_0, 0_1, 0_2, ...
            tile.id = r.toString() + "_" + c.toString();
            tile.classList.add( "tile" );

            // Add Event Listener to add a new piece whenever users click on a column
            // setPiece is a function that will be called whenever a column is clicked
            tile.addEventListener("click", setPiece);

            // within <div id ="board">, we want to add the newly created tiles
            document.getElementById( "board" ).append( tile );
        } // end for c
    } // end for r

    // Prompt the players who's turn it is
    document.getElementById( "announce" ).innerHTML = p1turn;

} // end function setGame

// This function is responsible for adding pieces to the board
function setPiece() {

    // We will check if the game is over
    // If the game is over, then nothing will happen
    // No one will be able to set pieces (until the game is reset)
    if (gameOver) {
        return;
    }

    if (clientPlayer != currentPlayer) {
        return;
    }

    // If the game is not over, then we will obtain the coordinates of the tile that has been clicked
    // Example: if 3-5 is clicked, coords will be set to [3,5]
    //          then r = 3 and c = 5
    let coords = this.id.split("_");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Set the row number according to the bottom most available cell
    r = currentColumns[ c ];

    // when r is filled up, then pieces can no longer be added to the column
    if ( r < 0 ) {
        return;
    } // end if r

    // Update the board
    board[r][c] = currentPlayer;

    // Update HTML - obtain the current tile object
    let tile = document.getElementById( r.toString() + "_" + c.toString() );
    let tileString = r.toString() + "_" + c.toString();

    // If the currentplayer is Player 1, add player 1's piece to the board
    // Otherwise, add player 2's piece to the board
    if (currentPlayer == player1 ) {
        tile.classList.add( "player1" );

        // alternate players after each turn
        // currentPlayer = player2;
        // document.getElementById( "announce" ).innerHTML = p2turn;
    }
    else {
        tile.classList.add( "player2" );

        // alternate players after each turn
        // currentPlayer = player1;
        // document.getElementById( "announce" ).innerHTML = p1turn;
    }

    // Whenever a new piece is added, we want to update r
    // so that we can keep track of the bottom most row for the column
    // Update the row height for specified column and the array
    r = r - 1;
    currentColumns[ c ] = r;

    // Emitting data to the server after setting a piece on board
    socket.emit("setPiece", {
        tile: tileString,
        currentPlayer: currentPlayer,
        username: username,
        board: board,
        row: r, 
        currentColumns: currentColumns
    });

    // After pieces are added, we want to see if there is a winner
    checkForWinner();

} // end function setPiece

socket.on("setPiece", (e) => {

    // extract data from server
    const currentPlay = e.currentPlayer;
    const foundObject = (e.allPlayers).find(obj => obj.p1.p1name == `${username}` || obj.p2.p2name == `${username}`);

    p1id = foundObject.p1.p1move;
    p2id = foundObject.p2.p2move;

    if ((foundObject.sum) % 2 == 0) {
        document.getElementById("announce").innerText = p2turn;
    }
    else {
        document.getElementById("announce").innerText = p1turn;
    }

    if (p1id != '') {
        document.getElementById(`${p1id}`).classList.add( "player1" );
    }

    if (p2id != '') {
        document.getElementById(`${p2id}`).classList.add( "player2" );
    }

    if ( currentPlay == 1 ) {
        currentPlayer = 2;
    }
    else if ( currentPlay == 2 ) {
        currentPlayer = 1;
    }

    board = e.board;
    currentColumns = e.currentColumns;

})

let winner;
let winnerFound = 0;

// The function checks for a winner
// If the board is full and there is no winner, it will determine the game as a tie
function checkForWinner(){
    
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != 0 && board[r][c] == board[r][c + 1] &&
                board[r][c] == board[r][c + 2] && board[r][c] == board[r][c + 3]) {
                // announceWinner(board[r][c]);
                winner = board[r][c];
                winnerFound = 1;
                console.log ( "SUCCESS: horizontal winner");
                break;
            } // end if
        } // end for c
    } // end for r

    if ( winnerFound == 0 ) {
        // vertical
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] != 0 && board[r][c] == board[r + 1][c] &&
                    board[r][c] == board[r + 2][c] && board[r][c] == board[r + 3][c]) {
                    // announceWinner(board[r][c]);
                    winner = board[r][c];
                    winnerFound = 1;
                    console.log ( "SUCCESS: vertical winner");
                    break;
                } // end if
            } // end for c
        } // end for r
    } // end if winnerFound

    if ( winnerFound == 0 ) {
    // diagonal (/)
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c <= columns - 4; c++) {
                if (board[r][c] != 0 && board[r][c] == board[r - 1][c + 1] &&
                    board[r][c] == board[r - 2][c + 2] && board[r][c] == board[r - 3][c + 3]) {
                    // announceWinner(board[r][c]);
                    winner = board[r][c];
                    winnerFound = 1;
                    console.log ( "SUCCESS: diagonal (/) winner");
                    break;
                } // end if
            } // end for c
        } // end for r
    } // end if winnerFound

    if ( winnerFound == 0 ) {
    // diagonal (\)
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 0; c <= columns - 4; c++) {
                if (board[r][c] != 0 && board[r][c] == board[r + 1][c + 1] &&
                    board[r][c] == board[r + 2][c + 2] && board[r][c] == board[r + 3][c + 3]) {
                    // announceWinner(board[r][c]);
                    winner = board[r][c];
                    winnerFound = 1;
                    console.log ( "SUCCESS: diagonal (\) winner");
                    break;
                } // end if
            } // end for c
        } // end for r
    } // end if winnerFound

    // Check for a tie
    if (isBoardFull()) {
        winner = 0; // 12 represents a tie
        winnerFound = 1;
        // Emitting data to the server after finding winner
        console.log ( "SUCCESS: tie");
        // announceWinner(0); // 0 represents a tie
    }

    // Emitting data to the server after finding winner
    socket.emit("setWinner", {
        winner: winner,
        winnerFound: winnerFound
    });

} // end checkForWinner 

// Function for checking whether the board is full or not
function isBoardFull() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            // If there is an empty spot on the board, this function will return false
            if (board[r][c] == 0) {
                return false;
            }
        }
    }

    // When the board is full and there are no empty spots, this function will return true
    return true; 
}

socket.on("winner", (e) => {
    // extract data from server
    const winningPlayer = e.winner;
    const winFound = e.winnerFound;
    console.log ( "SUCCESSFUL: Obtained winning player");
    console.log ( "winnerFound?: " + winFound );

    if ( winFound == 1 ) {
        announceWinner( winningPlayer );
    }

}) 

// Function for announcing winner
function announceWinner(winner) {
    gameOver = true;
    if (winner == 0) {
        document.getElementById("announce").innerHTML = "It's a tie!";
    } else if ( winner == 1 ) {
        document.getElementById("announce").innerHTML = "Player RED wins!";
    } else if ( winner ==2 ) {
        document.getElementById("announce").innerHTML = "Player YELLOW wins!";
    }
}

// Function for changing board color
function changeColors() {

    const boardElement = document.getElementById("board");
    const currentColor = boardElement.style.backgroundColor;
    const currentBorder = boardElement.style.border;

    if (currentColor == "rgb(0, 128, 138)") {
        newColor = "rgb(116, 134, 233)";
        newBorder = "12px solid rgb(0, 30, 128)";
    }
    else {
        newColor = "rgb(0, 128, 138)";
        newBorder = "12px solid rgb(0, 30, 128)";
    }
    
    boardElement.style.backgroundColor = newColor;
    boardElement.style.border = newBorder;
}