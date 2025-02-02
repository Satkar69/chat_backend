import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// create new socket server to wrap the express application
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://satkar-chat-app.onrender.com"],
    methods: ["GET", "POST"],
  },
});
// the parameter in the callback 'socket' is going to be the user that is connected
// socket has different properties, one being 'id' which is most commonly used

export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== undefined) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  // when ever a user connects it we can access who is online and who is offline with the event name 'getOnlineUsers'
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() method is used to listen to the events, can be userd on both client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete userSocketMap[userId];
    // other updated online users after we are disconnected
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
