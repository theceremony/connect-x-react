import type { Game } from "@/gameLogic/types";

import { socket } from "@/netCode/socket";
import type { ReducerHooks } from "./types";
import { getRoomFromURL } from "@/utils";

export const updateCurrentGameHook: ReducerHooks = ([key, value]) => {
  console.log("update current Game");
  socket.emit("fg:game-status-update", {
    room: getRoomFromURL(),
    gameStatus: value as Game,
  });
  return [key, value];
};
