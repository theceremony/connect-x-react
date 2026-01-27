/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import {
  deriveGameBoardByConnectionParam,
  DEFAULT_CONNECTION_LENGTH,
  DEFAULT_NUMBER_OF_PLAYERS,
  generateGame,
  PLAYER_COLORS,
} from "./gameLogic";
import type { Board, Piece } from "./gameLogic/types";

const boardSize = deriveGameBoardByConnectionParam(DEFAULT_CONNECTION_LENGTH)(
  DEFAULT_NUMBER_OF_PLAYERS,
);

export const initialState = {
  winningConnectionLength: DEFAULT_CONNECTION_LENGTH,
  numberOfPlayers: DEFAULT_NUMBER_OF_PLAYERS,
  boardSize,
  gameState: generateGame(boardSize) as Board,
  currentPiece: PLAYER_COLORS[0] as Piece,
  winner: undefined,
};
export type State = typeof initialState;
export type Action = [keyof State, State[keyof State]];

export type Dispatch = React.ActionDispatch<[action: Action]>;
export type AppContextType = {
  state: State;
  dispatch?: Dispatch;
};

const AppContext = createContext<AppContextType>({
  state: initialState as State,
});
export default AppContext;
