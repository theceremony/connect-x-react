import { PLAYER_COLORS } from "./gameLogic";
import type { Game, Lobby, Piece } from "./gameLogic/types";

// -----------------------------------------------------------------------------
export const initialState = {
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  currentPiece: PLAYER_COLORS[0] as Piece,
  previousGames: [] as Game[],
};
// -----------------------------------------------------------------------------
export type State = typeof initialState;
export type ActionKeys = keyof State;
export type ActionValues = State[keyof State];
// -----------------------------------------------------------------------------
export type Action = [ActionKeys, ActionValues];
// -----------------------------------------------------------------------------
export type ReducerMiddleware = (action: Action) => Action;

const basicMiddleware: ReducerMiddleware = (a) => a;

const reducerMiddleware: [ActionKeys, ReducerMiddleware][] = [
  [
    "lobby",
    (a) => {
      console.log(a);
      return a;
    },
  ],
];

const getMiddlewareByKey = (key: ActionKeys) =>
  reducerMiddleware.filter(([mKey]) => key === mKey)[0][1];

export type Dispatch = React.ActionDispatch<[action: Action]>;

const createAppReducer =
  (s: State = initialState) =>
  (state: State = s, action: Action) => {
    const middleWare: ReducerMiddleware =
      getMiddlewareByKey(action[0]) || basicMiddleware;
    const newAction = middleWare(action);
    return { ...state, [newAction[0]]: newAction[1] };
  };

export const appReducer = createAppReducer();
