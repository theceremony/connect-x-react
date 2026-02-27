import { io, type Socket } from "socket.io-client";
import { SOCKET_PORT } from "./config";
import type { ClientEvents, ServerEvents } from "./types";
//------------------------------------------------------------------------------

export const socket: Socket<ServerEvents, ClientEvents> = io(
  `http://${window.location.hostname}:${SOCKET_PORT}`,
);
