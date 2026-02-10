import { Server as Engine } from "@socket.io/bun-engine";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Server } from "socket.io";
import type { ClientEvents, ServerEvents } from "./types";
const engine = new Engine();
const io = new Server<ClientEvents, ServerEvents>({
  cors: {
    methods: ["GET", "POST"],
    origin: ["*:*"],
  },
});

io.bind(engine);
io.on("connection", (socket) => {
  console.log(socket.id);
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
  socket.on("fg:request-player-status", (data) => {
    console.log(data);
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
  socket.on("disconnect", () => {
    socket.broadcast.emit("tg:disconnect", { id: socket.id });
  });
  // ---------------------------------------------------------------------------
});
const app = new Hono();
app.use(
  cors({
    origin: "*",
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: false,
  }),
);
const { websocket } = engine.handler();
export default {
  port: 3000,
  idleTimeout: 30, // must be greater than the "pingInterval" option of the engine, which defaults to 25 seconds
  hostname: "0.0.0.0",
  fetch(req: Request, server: unknown) {
    const url = new URL(req.url);

    if (url.pathname === "/socket.io/") {
      return engine.handleRequest(req, server);
    } else {
      return app.fetch(req, server);
    }
  },

  websocket,
};
