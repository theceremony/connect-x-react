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

// Handle incoming connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for a custom event named 'message' from the client
  socket.on("message", (msg: string) => {
    console.log("message: " + msg);
    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
