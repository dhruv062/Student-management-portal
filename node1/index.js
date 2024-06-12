const express = require("express");
const http = require("http");
// const socketIo = require("socket.io");
const winston = require("winston");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://axp2333.uta.cloud",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const connectedUsers = {}; // Dictionary to store user IDs and their associated sockets

// Create a Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "chat.log" }),
  ],
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  logger.log("info", `A user connected1 ${socket.id}`);

  socket.on("userConnected", ({ userId }) => {
    // Store the user ID in the object
    connectedUsers[userId] = socket.id;
    console.log(`User connected with ID: ${userId}`);
    console.table(connectedUsers);
  });

  socket.on("chat message", ({ message, receiverUserId }) => {
    // Check if the receiver's user ID is present in connectedUsers
    if (!connectedUsers[receiverUserId]) return;
    const senderId = Object.keys(connectedUsers).find((user) => {
      return connectedUsers[user] === socket.id;
    });
    console.log(`Sending message to user ID: ${receiverUserId}`);
    io.to(connectedUsers[receiverUserId]).emit("chat message", {message,senderId });
  }); 

  socket.on("typing", ({ receiverUserId }) => {
    console.log(receiverUserId);
    // Check if the receiver's user ID is present in connectedUsers
    console.log("typing");
    if (!connectedUsers[receiverUserId]) return;
    console.log(`Sending typing to user ID: ${receiverUserId}`);
    io.to(connectedUsers[receiverUserId]).emit("typing");
  });

  socket.on("stopTyping", ({ receiverUserId }) => {
    // Check if the receiver's user ID is present in connectedUsers
    console.log("stopTyping");
    if (!connectedUsers[receiverUserId]) return;
    console.log(`Sending stopTyping to user ID: ${receiverUserId}`);
    io.to(connectedUsers[receiverUserId]).emit("stopTyping");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Remove the user from the object when they disconnect
    const userId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.id
    );
    delete connectedUsers[userId];
    console.table(connectedUsers);
  });
});

server.listen(3001, () => {
  logger.log("info", "Server is listening on *:3001");
});
