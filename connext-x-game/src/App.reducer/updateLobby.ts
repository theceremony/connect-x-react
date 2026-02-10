import type { Lobby } from "@/gameLogic/types";
import { ROOM } from "@/netCode/config";
import { socket } from "@/netCode/socket";
import type { ReducerHooks } from ".";

export const updateLobbyHook: ReducerHooks = ([key, value], { lobby }) => {
  const nl = value as Lobby;

  const np = [...nl.filter((item) => !lobby.includes(item))][0];
  const dp = [...lobby.filter((item) => !nl.includes(item))][0];

  // New Player ----------------------------------------------------------------
  if (np)
    socket.emit("fg:player-connection-approved", {
      room: ROOM,
      player: np,
    });
  // Disconnected Player -------------------------------------------------------
  if (dp)
    socket.emit("fg:player-disconnected", {
      room: ROOM,
      player: dp,
    });
  // Lobby Update --------------------------------------------------------------
  socket.emit("fg:lobby-update", {
    room: ROOM,
    lobby: nl,
  });
  // Return Action -------------------------------------------------------------
  return [key, nl];
};
