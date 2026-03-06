import { io, type Socket } from "socket.io-client";
import { SOCKET_PORT } from "./config";
import type { ClientEvents, ServerEvents } from "./types";
//------------------------------------------------------------------------------

const socketURL = new URL(window.location.href);
socketURL.port = SOCKET_PORT.toString();
socketURL.pathname = "";

const isNGrock = () => socketURL.href.includes("ngrok");

export const socket: Socket<ServerEvents, ClientEvents> = io(
  isNGrock() ? "" : socketURL.href,
);
