const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');

var username = prompt("Please enter your name: ", "your name");
let pNumber;

// socket.on('playerNumber', (playerNumber) => {
//     pNumber = playerNumber;
// });

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        socket.emit('message', 
        {   sender: username, 
            message: messageInput.value});
        messageInput.value = '';
    }
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message.sender + ": " + message.message;
    // messageElement.innerText = message.sender + "(Player " + pNumber + "): " + message.message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});
