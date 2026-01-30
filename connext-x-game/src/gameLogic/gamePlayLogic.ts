import { CONNECTION_VECTORS } from "./config";
import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
  createPlayBoardGrid,
  getBoardValByPos,
  addVectorToPos,
  getInvVect,
  genNewGameBoard,
} from "./playSpaceControl";
// -----------------------------------------------------------------------------
import type {
  Action,
  Board,
  Connection,
  Game,
  Piece,
  Position,
  Slot,
  Vector,
} from "./types";
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
export const getLine =
  (playBoard: Board) => (pos: Position) => (val: Slot) => (vec: Vector) => {
    let curPos = pos;
    const line = [];
    while (getBoardValByPos(playBoard)(curPos) === val) {
      line.push(curPos);
      curPos = addVectorToPos(curPos)(vec);
    }
    return line;
  };
// -----------------------------------------------------------------------------
export const getByDirectionalLine =
  (playBoard: Board) => (pos: Position) => (value: Slot) => (vec: Vector) => [
    ...new Set([
      ...getLine(playBoard)(pos)(value)(vec),
      ...getLine(playBoard)(pos)(value)(getInvVect(vec)),
    ]),
  ];
// -----------------------------------------------------------------------------
export const effectGetLongestConnByPos = ({
  updatedBoard: playBoard,
  position,
}: Action) =>
  CONNECTION_VECTORS.map((v) =>
    getByDirectionalLine(playBoard)(position)(
      getBoardValByPos(playBoard)(position),
    )(v),
  ).reduce((a, c) => (a.length > c.length ? a : c), [] as Connection);
// -----------------------------------------------------------------------------
export const getActionByColumnDrop =
  (playBoard: Board) => (x: number) => (value: Piece) => {
    const position: Position = [x, getHighestEmptySlotInColumn(playBoard[x])];
    if (doesSlotExist(playBoard)(position)) {
      return {
        updatedBoard: setSlot(playBoard)(position)(value),
        position,
      } as Action;
    }
    return undefined;
  };
// -----------------------------------------------------------------------------
export const generateGame =
  (connectLength: number) => (numberOfPlayers: number) => {
    const boardSize = genNewGameBoard(connectLength)(numberOfPlayers);
    return {
      connectLength,
      numberOfPlayers,
      board: createPlayBoardGrid(boardSize[0])(boardSize[1]),
    } as Game;
  };

// -----------------------------------------------------------------------------
export const getNumberOfEmptySlots = (playBoard: Board) =>
  playBoard.reduce((acc, c) => acc + c.filter((s) => s === "empty").length, 0);
// -----------------------------------------------------------------------------
export const checkForWinnerByAction =
  (winningConnectionLength: number) => (action: Action) =>
    effectGetLongestConnByPos(action).length >= winningConnectionLength;
// -----------------------------------------------------------------------------
