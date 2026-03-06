import type { Game } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import { getRoomFromURL } from "@/utils";
import type { ReducerHooks } from "./types";
//------------------------------------------------------------------------------
export const updateCurrentGameHook: ReducerHooks = (
  [key, value],
  { gameMode },
) => {
  if (gameMode === "player") return [key, value];
  if (value === undefined) {
    socket.emit("fg:game-status-update", {
      room: getRoomFromURL(),
      gameStatus: value,
    });
    return [key, value];
  }
  // ===========================================================================
  socket.emit("fg:game-status-update", {
    room: getRoomFromURL(),
    gameStatus: (value as Game) || undefined,
  });
  // ===========================================================================
  return [key, value];
};
//------------------------------------------------------------------------------
