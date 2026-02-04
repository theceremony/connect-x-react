import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type { ServerEvents, ClientEvents } from "./types";

const app = express();
const httpServer = createServer(app);
// Initialize Socket.IO server and pass the HTTP server instance
const io = new Server<ClientEvents, ServerEvents>(httpServer, {
  cors: {
    origin: "*", // Allow all origins for simplicity in a simple example
    methods: ["GET", "POST"],
  },
});
async function getSocketIds() {
  const sockets = await io.fetchSockets();
  return sockets.map((v) => ({
    id: v.id,
    path: v.handshake.query.path,
  }));
}
io.on("connection", async (socket) => {
  if (socket.handshake.query.path === "/game") {
    const sockets = await getSocketIds();
    io.emit("game:connected", { id: socket.id, clients: sockets });
    socket.on("game:player-joined-lobby", (val) => {
      io.emit("game:player-joined-lobby", val);
    });
    socket.on("game:player-left-lobby", (val) => {
      io.emit("game:player-left-lobby", val);
    });
    socket.on("disconnect", () => {
      console.log("A game disconnected");
      io.emit("game:disconnect", { id: socket.id });
    });
  } else if (socket.handshake.query.path === "/player") {
    console.log("player connected");
    io.emit("player:connected", { id: socket.id });
    socket.on("disconnect", () => {
      console.log("A player disconnected");
      io.emit("player:disconnect", { id: socket.id });
    });
  }
});

httpServer.listen(3000, "0.0.0.0");
