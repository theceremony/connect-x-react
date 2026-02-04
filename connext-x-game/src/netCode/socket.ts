import { io, type Socket } from "socket.io-client";
import type { ClientEvents, ServerEvents } from "./types";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : `${window.location.hostname}:3000`;

export const socket: Socket<ServerEvents, ClientEvents> = io(URL, {
  query: { path: window.location.pathname },
});
