import type { Lobby } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
//------------------------------------------------------------------------------
import type { ReducerHooks } from "./types";
//------------------------------------------------------------------------------
export const updateLobbyHook: ReducerHooks = (
  [key, value],
  { lobby, room, gameMode },
) => {
  // ===========================================================================
  if (gameMode === "player") return [key, value];
  // ===========================================================================
  const nl = value as Lobby;
  const np = [...nl.filter((item) => !lobby.includes(item))][0];
  const dp = [...lobby.filter((item) => !nl.includes(item))][0];
  // ===========================================================================
  // New Player ----------------------------------------------------------------
  if (np)
    socket.emit("fg:player-connection-approved", {
      room,
      player: np,
    });
  // Disconnected Player -------------------------------------------------------
  if (dp)
    socket.emit("fg:player-disconnected", {
      room,
      player: dp,
    });
  // Lobby Update --------------------------------------------------------------
  socket.emit("fg:lobby-update", {
    room,
    lobby: nl,
  });
  // Return Action -------------------------------------------------------------
  return [key, nl];
};
