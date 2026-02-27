import { io, type Socket } from "socket.io-client";
import type { ClientEvents, ServerEvents } from "./types";
//------------------------------------------------------------------------------

const socketURL = new URL(window.location.href);
// socketURL.port = SOCKET_PORT.toString();
socketURL.pathname = "";

export const socket: Socket<ServerEvents, ClientEvents> = io(socketURL.href);
