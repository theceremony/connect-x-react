import { socket } from "@/netCode/socket";
import type { ReducerHooks } from "./types";
//------------------------------------------------------------------------------
export const updateConnectCountHook: ReducerHooks = (
  [key, value],
  { gameMode, room },
) => {
  if (gameMode === "player") return [key, value];

  // ===========================================================================
  socket.emit("fg:connect-update", {
    room,
    connectAmount: value as number,
  });
  // ===========================================================================
  return [key, value];
};
//------------------------------------------------------------------------------
