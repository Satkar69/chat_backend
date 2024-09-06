import { Server } from "socket.io";
import http from "http";
import express from "express";

const socketApp = express();

// create new socket server to wrap the express application
const server = http.createServer(socketApp);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// the parameter in the callback 'socket' is going to be the user that is connected
// socket has different properties, one being 'id' which is most commonly used
io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  // socket.on() method is used to listen to the events, can be userd on both client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });
});

export { socketApp, io, server };
