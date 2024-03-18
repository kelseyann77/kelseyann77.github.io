const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const message = messageInput.value;
        socket.emit('message', message);
        messageInput.value = '';
    }
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});
    