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
async function getSocketIds() {
  const sockets = await io.fetchSockets();
  return sockets.map((v) => ({
    id: v.id,
    path: v.handshake.query.path,
  }));
}
io.on("connection", async (socket) => {
  if (socket.handshake.query.path === "/game") {
    console.log("game connected");
    const sockets = await getSocketIds();
    io.emit("game:connected", { id: socket.id, clients: sockets });
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

  socket.on("game:player-joined-lobby", (val) => console.log(val));
});

httpServer.listen(3000, "0.0.0.0");
