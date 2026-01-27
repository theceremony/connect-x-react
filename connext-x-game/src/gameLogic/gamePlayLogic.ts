import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
  createPlayBoardGrid,
  getBoardValByPos,
  addVectorToPos,
} from "./playSpaceControl";
// -----------------------------------------------------------------------------
import type {
  Action,
  Board,
  Connection,
  GetConnFunc,
  Piece,
  Position,
  Slot,
  Vector,
} from "./types";
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

export const checkForDupes = (p: Position, i: number, arr: Position[]) =>
  arr.indexOf(p) === i;
// -----------------------------------------------------------------------------
export const getDiagConn =
  (way: number) => (playBoard: Board) => (pos: Position) => (value: Slot) =>
    [
      ...getLine(playBoard)([way, 1])(pos)(value),
      ...getLine(playBoard)([-way, -1])(pos)(value),
    ].filter(checkForDupes);
// -----------------------------------------------------------------------------
export const getHorizConn =
  (playBoard: Board) => (pos: Position) => (value: Slot) =>
    [
      ...getLine(playBoard)([1, 0])(pos)(value),
      ...getLine(playBoard)([-1, 0])(pos)(value),
    ].filter(checkForDupes);
// -----------------------------------------------------------------------------
export const getVertConn =
  (playBoard: Board) => (pos: Position) => (value: Slot) =>
    [
      ...getLine(playBoard)([0, 1])(pos)(value),
      ...getLine(playBoard)([0, -1])(pos)(value),
    ].filter(checkForDupes);

// -----------------------------------------------------------------------------
export const getConn =
  (b: Board) => (p: Position) => (v: Slot) => (fn: GetConnFunc) =>
    fn(b)(p)(v);
// -----------------------------------------------------------------------------
export const effectGetLongestConnByPos = ({
  updatedBoard,
  position,
}: Action) => {
  const fn = getConn(updatedBoard)(position)(
    getBoardValByPos(updatedBoard)(position),
  );
  return [
    fn(getVertConn),
    fn(getHorizConn),
    fn(getDiagConn(1)),
    fn(getDiagConn(-1)),
  ].reduce(
    (acc, connection) => (acc.length > connection.length ? acc : connection),
    [] as Connection,
  );
};
// -----------------------------------------------------------------------------
export const setSlotByColumnDrop =
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
