import { createAppReducer } from "./createReducer";
import { INITIAL_STATE } from "./initialState";
import { updateCurrentGameHook } from "./updateGame";
import { updateLobbyHook } from "./updateLobby";

// -----------------------------------------------------------------------------
export * from "./types";
export { INITIAL_STATE as initialState };
// -----------------------------------------------------------------------------
export const appReducer = createAppReducer(INITIAL_STATE)([
  ["lobby", updateLobbyHook],
  ["currentGame", updateCurrentGameHook],
]);
