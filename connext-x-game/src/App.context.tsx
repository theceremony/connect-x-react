/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { PLAYER_COLORS } from "./gameLogic";
import type { Game, Piece } from "./gameLogic/types";
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
export const initialState = {
  currentGame: undefined as undefined | Game,
  currentPiece: PLAYER_COLORS[0] as Piece,

  previousGames: [] as Game[],
};
// -----------------------------------------------------------------------------
export type State = typeof initialState;
// -----------------------------------------------------------------------------
export type Action = [keyof State, State[keyof State]];
// -----------------------------------------------------------------------------
export type Dispatch = React.ActionDispatch<[action: Action]>;
// -----------------------------------------------------------------------------
export type AppContextType = {
  state: State;
  dispatch?: Dispatch;
};
// -----------------------------------------------------------------------------
export const appReducer = (state: State, action: Action) => {
  return { ...state, [action[0]]: action[1] };
};
// -----------------------------------------------------------------------------
const AppContext = createContext<AppContextType>({
  state: initialState as State,
});
// -----------------------------------------------------------------------------
export default AppContext;
