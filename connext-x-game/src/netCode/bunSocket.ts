// socketServer.ts (Bun + WebSocket, no Express, no Socket.IO)

import type { Server as BunServer } from "bun";
import { SOCKET_PORT } from "./config";
import type { ClientEvents, ServerEvents } from "./types";

/**
 * Derive a typed message protocol from your existing Socket.IO event maps.
 * Clients send: { type: <ClientEventName>, data: <payload> }
 * Server sends: { type: <ServerEventName>, data: <payload> }
 */
type ClientMessage = {
  [K in keyof ClientEvents]: Parameters<ClientEvents[K]> extends [
    infer P,
    ...any[],
  ]
    ? { type: K; data: P }
    : { type: K; data?: never };
}[keyof ClientEvents];

type ServerMessage = {
  [K in keyof ServerEvents]: Parameters<ServerEvents[K]> extends [
    infer P,
    ...any[],
  ]
    ? { type: K; data: P }
    : { type: K; data?: never };
}[keyof ServerEvents];

type WSData = {
  id: string;
  rooms: Set<string>;
};

type BunWS = WebSocket<WSData>;

// ----------------------------------------------------------------------------
// Room + socket registries
// ----------------------------------------------------------------------------
const sockets = new Set<BunWS>();
const rooms = new Map<string, Set<BunWS>>();

function getOrCreateRoom(room: string): Set<BunWS> {
  let set = rooms.get(room);
  if (!set) {
    set = new Set<BunWS>();
    rooms.set(room, set);
  }
  return set;
}

function joinRoom(ws: BunWS, room: string): void {
  ws.data.rooms.add(room);
  getOrCreateRoom(room).add(ws);
}

function leaveRoom(ws: BunWS, room: string): void {
  ws.data.rooms.delete(room);
  const set = rooms.get(room);
  if (!set) return;
  set.delete(ws);
  if (set.size === 0) rooms.delete(room);
}

function leaveAllRooms(ws: BunWS): void {
  for (const room of ws.data.rooms) leaveRoom(ws, room);
}

// ----------------------------------------------------------------------------
// Message helpers
// ----------------------------------------------------------------------------
function send(ws: BunWS, msg: ServerMessage): void {
  if (ws.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify(msg));
}

function broadcastAll(msg: ServerMessage, except?: BunWS): void {
  const raw = JSON.stringify(msg);
  for (const ws of sockets) {
    if (ws === except) continue;
    if (ws.readyState === WebSocket.OPEN) ws.send(raw);
  }
}

function broadcastRoom(room: string, msg: ServerMessage, except?: BunWS): void {
  const set = rooms.get(room);
  if (!set) return;
  const raw = JSON.stringify(msg);
  for (const ws of set) {
    if (ws === except) continue;
    if (ws.readyState === WebSocket.OPEN) ws.send(raw);
  }
}

function safeParseClientMessage(text: string): ClientMessage | null {
  try {
    const obj: unknown = JSON.parse(text);

    if (typeof obj !== "object" || obj === null) return null;
    const rec = obj as Record<string, unknown>;

    if (typeof rec.type !== "string") return null;

    // We can't fully runtime-validate payload shapes without a schema library,
    // but we can enforce the envelope contract.
    return {
      type: rec.type as ClientMessage["type"],
      data: rec.data as any,
    } as ClientMessage;
  } catch {
    return null;
  }
}

function shortId(): string {
  return crypto.randomUUID().slice(0, 8);
}

// ----------------------------------------------------------------------------
// CORS / Origin gating (for browser WebSocket handshakes)
// ----------------------------------------------------------------------------
const ALLOWED_ORIGINS = new Set<string>([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.0.114:5173", // keep/update as needed
]);

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  // Non-browser clients often have no Origin; allow them.
  if (!origin) return true;
  return ALLOWED_ORIGINS.has(origin);
}

// ----------------------------------------------------------------------------
// Bun server
// ----------------------------------------------------------------------------
const HOSTNAME = "0.0.0.0";

const bunServer = Bun.serve({
  port: SOCKET_PORT,
  hostname: HOSTNAME,

  fetch(req: Request, server: BunServer): Response {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true });
    }

    // WebSocket endpoint
    if (url.pathname === "/ws") {
      if (!isAllowedOrigin(req)) {
        return new Response("Forbidden origin", { status: 403 });
      }

      const upgraded = server.upgrade(req, {
        data: {
          id: shortId(),
          rooms: new Set<string>(),
        } satisfies WSData,
      });

      return upgraded
        ? new Response(null, { status: 101 })
        : new Response("WebSocket upgrade failed", { status: 400 });
    }

    // Optional: simple root response
    if (url.pathname === "/") {
      return new Response("Bun WebSocket server running. Connect to /ws", {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },

  websocket: {
    open(ws: BunWS) {
      sockets.add(ws);
      // ws.data.id is already set in upgrade()
      // console.log(`connected ${ws.data.id}`);
    },

    message(ws: BunWS, message: string | Uint8Array) {
      const text =
        typeof message === "string"
          ? message
          : Buffer.from(message).toString("utf8");
      const msg = safeParseClientMessage(text);
      if (!msg) return;

      // -----------------------------------------------------------------------
      // Your original Socket.IO handlers, ported 1:1
      // -----------------------------------------------------------------------
      switch (msg.type) {
        // -------------------------
        // From Game
        // -------------------------
        case "fg:request-connection": {
          const { room } = msg.data as { room: string };
          joinRoom(ws, room);
          // io.to(room).emit("tg:approve-connection", { id: socket.id, room })
          broadcastRoom(room, {
            type: "tg:approve-connection",
            data: { id: ws.data.id, room },
          });
          break;
        }

        case "fg:request-player-status": {
          const { room } = msg.data as { room: string };
          joinRoom(ws, room);
          // io.to(room).emit("tap:request-player-status")
          broadcastRoom(room, {
            type: "tap:request-player-status",
            data: undefined as any,
          });
          break;
        }

        case "fg:player-connection-approved": {
          const { room, player } = msg.data as {
            room: string;
            player: unknown;
          };
          joinRoom(ws, room);
          // io.to(room).emit("tp:approve-connection", { player, room })
          broadcastRoom(room, {
            type: "tp:approve-connection",
            data: { player, room } as any,
          });
          break;
        }

        case "fg:game-status-update": {
          const { room, gameStatus } = msg.data as {
            room: string;
            gameStatus: unknown;
          };
          joinRoom(ws, room);
          // io.to(room).emit("tap:game-status-update", { room, gameStatus })
          broadcastRoom(room, {
            type: "tap:game-status-update",
            data: { room, gameStatus } as any,
          });
          break;
        }

        // -------------------------
        // From Player
        // -------------------------
        case "fp:request-connection": {
          const { room } = msg.data as { room: string };
          joinRoom(ws, room);
          // io.to(room).emit("tg:request-player-connection", { playerId: socket.id, room })
          broadcastRoom(room, {
            type: "tg:request-player-connection",
            data: { playerId: ws.data.id, room } as any,
          });
          break;
        }

        case "fp:player-action": {
          const data = msg.data as { room: string } & Record<string, unknown>;
          const { room, ...rest } = data;
          joinRoom(ws, room);
          // io.to(room).emit("tg:player-action", { room, ...data })
          broadcastRoom(room, {
            type: "tg:player-action",
            data: { room, ...rest } as any,
          });
          break;
        }

        default:
          // Unknown client event name; ignore
          break;
      }
    },

    close(ws: BunWS) {
      // socket.broadcast.emit("tg:disconnect", { id: socket.id })
      // Here "broadcast" = everyone except this ws
      broadcastAll(
        { type: "tg:disconnect", data: { id: ws.data.id } as any },
        ws,
      );

      leaveAllRooms(ws);
      sockets.delete(ws);
    },
  },
});

console.log(
  `✅ Bun WS server listening on http://${HOSTNAME}:${bunServer.port} (WS: /ws)`,
);

// ----------------------------------------------------------------------------
// Graceful shutdown
// ----------------------------------------------------------------------------
const gracefulShutdown = (): void => {
  console.log("Starting graceful shutdown...");

  // Disconnect all clients
  for (const ws of sockets) {
    try {
      ws.close(1001, "Server shutting down");
    } catch {
      // ignore
    }
  }
  sockets.clear();
  rooms.clear();

  // Stop accepting new connections
  bunServer.stop();
  console.log("Server stopped. Exiting.");

  setTimeout(() => process.exit(0), 0);

  setTimeout(() => {
    console.error("Forcing shutdown due to timeout.");
    process.exit(1);
  }, 10_000);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
