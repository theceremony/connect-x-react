import { socket } from "@/netCode/socket";
import { PLAYER_COLORS } from "./gameLogic";
import type { Game, Lobby, Piece } from "./gameLogic/types";
import { ROOM } from "./netCode/config";
// -----------------------------------------------------------------------------
export const initialState = {
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  currentPiece: PLAYER_COLORS[0] as Piece,
  previousGames: [] as Game[],
};
// -----------------------------------------------------------------------------
export type State = typeof initialState;
// -----------------------------------------------------------------------------
export type ActionKeys = keyof State;
export type ActionValues = State[keyof State];
export type Action = [ActionKeys, Partial<ActionValues>];
export type Dispatch = React.ActionDispatch<[action: Action]>;
// -----------------------------------------------------------------------------
export type ReducerMiddleware = (action: Action, state: State) => Action;
export type RegisteredMiddleWare = [ActionKeys, ReducerMiddleware];
// -----------------------------------------------------------------------------
const basicMiddleware: ReducerMiddleware = ([key, val]) => {
  console.log(`update ${key}`);
  return [key, val];
};
// -----------------------------------------------------------------------------

const updateLobbyHook: ReducerMiddleware = ([key, value], { lobby }) => {
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
  socket.emit("fg:lobby-update", {
    room: ROOM,
    lobby: nl,
  });
  // Return Action -------------------------------------------------------------
  return [key, nl];
};
// -----------------------------------------------------------------------------
const updateCurrentGameHook: ReducerMiddleware = ([key, value]) => {
  console.log("update current Game");
  socket.emit("fg:game-status-update", {
    room: ROOM,
    gameStatus: value as Game,
  });
  return [key, value];
};
// -----------------------------------------------------------------------------
const registeredMiddleware: RegisteredMiddleWare[] = [
  ["lobby", updateLobbyHook],
  ["currentGame", updateCurrentGameHook],
];
// -----------------------------------------------------------------------------
export const getMiddleWaresByKey = (key: ActionKeys) => [
  basicMiddleware,
  ...registeredMiddleware.filter(([mKey]) => key === mKey).map((v) => v[1]),
];
// -----------------------------------------------------------------------------
export const registerMiddleware = (m: RegisteredMiddleWare) =>
  registeredMiddleware.push(m);
// -----------------------------------------------------------------------------
const createAppReducer =
  (s: State = initialState) =>
  (state: State = s, action: Action) => ({
    ...state,
    [action[0]]: getMiddleWaresByKey(action[0]).reduce(
      (acc: Action, v: ReducerMiddleware) => v(acc, state),
      action,
    )[1],
  });
// -----------------------------------------------------------------------------
export const appReducer = createAppReducer();
