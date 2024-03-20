Commands to install packages used to setup server:
cd <directory containing 'public' folder>
npm init -y
npm install socket.io
npm install express
npm install express-session
node server.js

Referenced: 
https://www.youtube.com/watch?v=4ARsthVnCTg&ab_channel=KennyYipCoding
https://github.com/ImKennyYip/Connect4
https://simulationcorner.net/index.php?page=connectfour 

https://stackoverflow.com/questions/53713267/fixed-side-chat-menu-using-flex-box 
https://reintech.io/blog/how-to-create-chat-application-using-node-js 
https://blog.devgenius.io/building-a-simple-real-time-chat-app-with-node-js-and-socket-io-5ec6c4606503
https://modernweb.com/building-multiplayer-games-node-js-socket-io/ 



File communication (Express)
    Client asks server for a file (ex: picture.jpeg or picture.png)

Package communication (Socket.io)
    Client sends data to server (Ex: Input)
    Server sends data to client (Ex: Piece Position)