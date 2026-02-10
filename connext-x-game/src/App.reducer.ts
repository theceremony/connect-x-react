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
const basicMiddleware: ReducerMiddleware = (a) => a;
// -----------------------------------------------------------------------------

const updateLobbyHook: ReducerMiddleware = ([key, value], { lobby }) => {
  console.log("update current lobby");
  console.log(lobby, value);
  const newLobby = value as Lobby;
  const newPlayer = [...newLobby.filter((item) => !lobby.includes(item))][0];

  const removedPlayer = [
    ...lobby.filter((item) => !newLobby.includes(item)),
  ][0];

  console.log({ newPlayer });
  console.log({ removedPlayer });

  if (newPlayer)
    socket.emit("fg:player-connection-approved", {
      room: ROOM,
      player: newPlayer,
    });
  if (removedPlayer)
    socket.emit("fg:player-disconnected", {
      room: ROOM,
      player: removedPlayer,
    });
  socket.emit("fg:lobby-update", {
    room: ROOM,
    lobby: newLobby,
  });
  return [key, newLobby];
};

const updateCurrentGameHook: ReducerMiddleware = ([key, value]) => {
  console.log("update current Game");
  socket.emit("fg:game-status-update", {
    room: ROOM,
    gameStatus: value as Game,
  });
  return [key, value];
};

const registeredMiddleware: RegisteredMiddleWare[] = [
  ["lobby", updateLobbyHook],
  [
    "lobby",
    (a) => {
      console.log("two");
      return a;
    },
  ],
  ["currentGame", updateCurrentGameHook],
];

export const getMiddleWaresByKey = (key: ActionKeys) => {
  const filtered = registeredMiddleware.filter(([mKey]) => key === mKey);
  return filtered.length > 0 ? filtered.map((v) => v[1]) : [basicMiddleware];
};

export const registerMiddleware = (m: RegisteredMiddleWare) => {
  registeredMiddleware.push(m);
};

const createAppReducer =
  (s: State = initialState) =>
  (state: State = s, action: Action) => {
    // const transAction = getMiddlewareByKey(action[0])(action);
    const transAction = getMiddleWaresByKey(action[0]).reduce(
      (acc: Action, v: ReducerMiddleware) => {
        return v(acc, state);
      },
      action,
    );
    return { ...state, [transAction[0]]: transAction[1] };
  };

export const appReducer = createAppReducer();
