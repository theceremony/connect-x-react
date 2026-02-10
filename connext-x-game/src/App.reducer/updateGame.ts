import type { Game } from "@/gameLogic/types";
import { ROOM } from "@/netCode/config";
import { socket } from "@/netCode/socket";
import type { ReducerHooks } from ".";

export const updateCurrentGameHook: ReducerHooks = ([key, value]) => {
  console.log("update current Game");
  socket.emit("fg:game-status-update", {
    room: ROOM,
    gameStatus: value as Game,
  });
  return [key, value];
};
