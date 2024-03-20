// const socket = io();

// Set global variables
var player1 = 1;
var player2 = 2;

var p1turn = "It's your turn, Player 1 (Red)";
var p2turn = "It's your turn, Player 2 (Yellow)";

var currentPlayer = player1;
var gameOver = false;

var board;
var currentColumns;

var rows = 6;
var columns = 7;

// When the page loads, we want the game to be setup
window.onload = function() {
    setGame();
}

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

    // If the currentplayer is Player 1, add player 1's piece to the board
    // Otherwise, add player 2's piece to the board
    if (currentPlayer == player1 ) {
        tile.classList.add( "player1" );

        // alternate players after each turn
        currentPlayer = player2;
        document.getElementById( "announce" ).innerHTML = p2turn;
    }
    else {
        tile.classList.add( "player2" );

        // alternate players after each turn
        currentPlayer = player1;
        document.getElementById( "announce" ).innerHTML = p1turn;
    }
    
    // Whenever a new piece is added, we want to update r
    // so that we can keep track of the bottom most row for the column
    // Update the row height for specified column and the array
    r = r - 1;
    currentColumns[ c ] = r;

    // After pieces are added, we want to see if there is a winner
    checkForWinner();

} // end function setPiece

// The function checks for a winner
// If the board is full and there is no winner, it will determine the game as a tie
function checkForWinner(){
    
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != 0 && board[r][c] == board[r][c + 1] &&
                board[r][c] == board[r][c + 2] && board[r][c] == board[r][c + 3]) {
                announceWinner(board[r][c]);
                return;
            } // end if
        } // end for c
    } // end for r

    // vertical
    for (let r = 0; r <= rows - 4; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != 0 && board[r][c] == board[r + 1][c] &&
                board[r][c] == board[r + 2][c] && board[r][c] == board[r + 3][c]) {
                announceWinner(board[r][c]);
                return;
            } // end if
        } // end for c
    } // end for r

    // diagonal (/)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != 0 && board[r][c] == board[r - 1][c + 1] &&
                board[r][c] == board[r - 2][c + 2] && board[r][c] == board[r - 3][c + 3]) {
                announceWinner(board[r][c]);
                return;
            } // end if
        } // end for c
    } // end for r

    // diagonal (\)
    for (let r = 0; r <= rows - 4; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != 0 && board[r][c] == board[r + 1][c + 1] &&
                board[r][c] == board[r + 2][c + 2] && board[r][c] == board[r + 3][c + 3]) {
                announceWinner(board[r][c]);
                return;
            } // end if
        } // end for c
    } // end for r

    // Check for a tie
    if (isBoardFull()) {
        announceWinner(0); // 0 represents a tie
    }

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

// Function for announcing winner
function announceWinner(winner) {
    gameOver = true;
    if (winner == 0) {
        document.getElementById("announce").innerHTML = "It's a tie!";
    } else {
        document.getElementById("announce").innerHTML = "Player " + winner + " wins!";
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