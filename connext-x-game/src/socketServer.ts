import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
// Initialize Socket.IO server and pass the HTTP server instance
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for simplicity in a simple example
    methods: ["GET", "POST"],
  },
});

io.of("/game").on("connection", (socket) => {
  console.log("game connected");
  socket.on("disconnect", () => {
    console.log("A game disconnected");
  });
});

io.of("/player").on("connection", (socket) => {
  console.log("player connected");
  socket.on("disconnect", () => {
    console.log("A player disconnected");
  });
});

httpServer.listen(3000, "0.0.0.0");
