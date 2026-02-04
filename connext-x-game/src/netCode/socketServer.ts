import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type { ServerEvents, ClientEvents } from "./types";

const app = express();
const server = createServer(app);

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
    socket.join(room);
    io.to(room).emit("tg:approve-connection", {
      id: socket.id,
      room,
    });
  });
  socket.on("fg:request-player-status", (data) => {
    console.log(data);
    // --> send request for player status to all players
    // --> get status back from individual players
    // --> send status back to game
  });
  socket.on("fg:player-connection-approved", ({ room, player }) => {
    socket.join(room);
    io.to(room).emit("tp:approve-connection", {
      player,
      room,
    });
  });
  // ---------------------------------------------------------------------------
  // From Player ---------------------------------------------------------------
  // ---------------------------------------------------------------------------
  socket.on("fp:request-connection", ({ room }) => {
    socket.join(room);
    io.to(room).emit("tg:request-player-connection", {
      playerId: socket.id,
      room,
    });
  });
  // ---------------------------------------------------------------------------
});
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
server.listen(3000, "0.0.0.0");
