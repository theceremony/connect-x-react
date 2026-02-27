import express from "express";
import { createServer } from "http";
// import fs from "node:fs";
import { Server } from "socket.io";

//------------------------------------------------------------------------------
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
import { SOCKET_PORT } from "./config";
import type { ClientEvents, ServerEvents } from "./types";

// const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);
// // // Now you can use __dirname as you normally would
// // console.log(__dirname);
// // const options = {
// //   key: fs.readFileSync(path.join(__dirname, "../../certs/localhost+2-key.pem")),
// //   cert: fs.readFileSync(path.join(__dirname, "../../certs/localhost+2.pem")),
// // };

//------------------------------------------------------------------------------
const server = createServer(express());
//------------------------------------------------------------------------------
const io = new Server<ClientEvents, ServerEvents>(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity in a simple example
    methods: ["GET", "POST"],
  },
});
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
io.on("connection", (socket) => {
  // ---------------------------------------------------------------------------
  // From Game -----------------------------------------------------------------
  // ---------------------------------------------------------------------------
  socket.on("fg:request-connection", ({ room }) => {
    // send game connection approval
    console.log(room);
    socket.join(room);
    io.to(room).emit("tg:approve-connection", {
      id: socket.id,
      room,
    });
  });
  socket.on("fg:request-player-status", ({ room }) => {
    io.to(room).emit("tap:request-player-status");
    // --> send request for player status to all players
    // --> get status back from individual players
    // --> send status back to game
  });
  socket.on("fg:player-connection-approved", ({ room, player }) => {
    console.log("fg:player-connection-approved");
    socket.join(room);
    io.to(room).emit("tp:approve-connection", {
      player,
      room,
    });
  });
  socket.on("fg:game-status-update", ({ room, gameStatus }) => {
    console.log("fg:game-status-update");
    socket.join(room);
    io.to(room).emit("tap:game-status-update", { room, gameStatus });
  });
  // ---------------------------------------------------------------------------
  // From Player ---------------------------------------------------------------
  // ---------------------------------------------------------------------------
  socket.on("fp:request-connection", ({ room }) => {
    console.log("player", socket.id);
    socket.join(room);
    io.to(room).emit("tg:request-player-connection", {
      playerId: socket.id,
      room,
    });
  });

  socket.on("fp:player-action", ({ room, ...data }) => {
    console.log("player", socket.id);
    socket.join(room);
    io.to(room).emit("tg:player-action", {
      room,
      ...data,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("tg:disconnect", { id: socket.id });
  });
  // ---------------------------------------------------------------------------
});
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
server.listen(SOCKET_PORT, "0.0.0.0");
const gracefulShutdown = async () => {
  console.log("Starting graceful shutdown...");

  // 1. Stop the HTTP server from accepting new connections
  server.close(() => {
    console.log("HTTP server closed. Exiting process.");
    process.exit(0); // Exit once all current HTTP connections are done
  });

  // 2. Disconnect all active Socket.IO clients
  const sockets = await io.fetchSockets();
  for (const socket of sockets) {
    // Pass 'true' to disable automatic client reconnection attempts
    socket.disconnect(true);
  }
  console.log("All Socket.IO clients disconnected.");

  // Optional: Add a timeout to force exit if connections hang
  setTimeout(() => {
    console.error("Forcing shutdown due to timeout.");
    process.exit(1);
  }, 10000); // 10 seconds timeout
};

// Listen for termination signals (like Ctrl+C or process manager signals)
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
