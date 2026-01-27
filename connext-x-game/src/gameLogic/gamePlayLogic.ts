import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
  createPlayBoardGrid,
  getBoardValByPos,
  addVectorToPos,
  getInvVect,
} from "./playSpaceControl";
// -----------------------------------------------------------------------------
import type {
  Action,
  Board,
  Connection,
  Piece,
  Position,
  Slot,
  Vector,
} from "./types";
const CONNECTION_VECTORS: Vector[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];
// -----------------------------------------------------------------------------
export const getLine =
  (playBoard: Board) => (vec: Vector) => (pos: Position) => (val: Slot) => {
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
  (playBoard: Board) => (pos: Position) => (value: Slot) => (vec: Vector) =>
    [
      ...getLine(playBoard)(vec)(pos)(value),
      ...getLine(playBoard)(getInvVect(vec))(pos)(value),
    ].filter((p: Position, i: number, arr: Position[]) => arr.indexOf(p) === i);
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
export const generateGame = (boardSize: number[]) =>
  createPlayBoardGrid(boardSize[0])(boardSize[1]);
// -----------------------------------------------------------------------------
export const getNumberOfEmptySlots = (playBoard: Board) =>
  playBoard.reduce((acc, c) => acc + c.filter((s) => s === "empty").length, 0);
// -----------------------------------------------------------------------------
export const checkForWinnerByAction =
  (winningConnectionLength: number) => (action: Action) =>
    effectGetLongestConnByPos(action).length >= winningConnectionLength;
// -----------------------------------------------------------------------------
