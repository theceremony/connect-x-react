import express from "express";
// import fs from "node:fs";
import ngrok from "@ngrok/ngrok";
import { Server } from "socket.io";
//------------------------------------------------------------------------------
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
import http from "http";
import path from "path";

import { NGROK_TOKEN, SOCKET_PORT } from "./config.ts";
import type { ClientEvents, ServerEvents } from "./types";

//------------------------------------------------------------------------------

const SERVE_NGROCK = false;
const app = express();
const server = http.createServer(app);
const distPath = path.join(process.cwd(), "dist");
console.log(distPath);
app.use(express.static(distPath));
app.use("/player", express.static(distPath));
//------------------------------------------------------------------------------
const io = new Server<ClientEvents, ServerEvents>(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity in a simple example
    methods: ["GET", "POST"],
  },
});

// await ViteExpress.bind(app, server);
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
    socket.join(room);
    io.to(room).emit("tap:game-status-update", { room, gameStatus });
  });
  socket.on("fg:connect-update", ({ room, connectAmount }) => {
    socket.join(room);
    io.to(room).emit("tg:connect-update", { room, connectAmount });
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
  socket.on("fp:report-player-status", ({ room, ...data }) => {
    socket.join(room);
    io.to(room).emit("tg:report-player-status", {
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
// server.listen(SOCKET_PORT, "0.0.0.0");
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

server.listen(SOCKET_PORT, async () => {
  console.log(`Express server running on http://localhost:${SOCKET_PORT}`);
  if (!SERVE_NGROCK) return;
  try {
    // Establish connectivity with ngrok
    const listener = await ngrok.forward({
      addr: SOCKET_PORT,
      authtoken: NGROK_TOKEN,
    });

    console.log(`Ingress established at: ${listener.url()}`); // The public ngrok URL
  } catch (error) {
    console.error("Failed to start ngrok tunnel:", error);
  }
});
