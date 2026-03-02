import type { Game } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import { getRoomFromURL } from "@/utils";
import type { ReducerHooks } from "./types";
//------------------------------------------------------------------------------
export const updateCurrentGameHook: ReducerHooks = ([key, value]) => {
  // ===========================================================================
  socket.emit("fg:game-status-update", {
    room: getRoomFromURL(),
    gameStatus: value as Game,
  });
  // ===========================================================================
  return [key, value];
};
//------------------------------------------------------------------------------
