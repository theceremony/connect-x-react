import { createAppReducer } from "./createReducer";
import { initialState } from "./initialState";
import { updateCurrentGameHook } from "./updateGame";
import { updateLobbyHook } from "./updateLobby";

// -----------------------------------------------------------------------------
export { initialState };
// -----------------------------------------------------------------------------
export const appReducer = createAppReducer(initialState)([
  ["lobby", updateLobbyHook],
  ["currentGame", updateCurrentGameHook],
]);
