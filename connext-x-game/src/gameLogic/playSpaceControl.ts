// -----------------------------------------------------------------------------
import type { Board, Slot, Piece, Column, Position, Vector } from "./types";
// -----------------------------------------------------------------------------
export const addVectorToPos =
  (pos: Position) =>
  (vector: Vector): Position => [pos[0] + vector[0], pos[1] + vector[1]];
// -----------------------------------------------------------------------------
export const getVectInverse = (v: Vector) => v.map((a) => -a) as Vector;
// -----------------------------------------------------------------------------
export const getBoardValByPos = (playBoard: Board) => (pos: Position) =>
  playBoard && playBoard[pos[0]] && playBoard[pos[0]][pos[1]];

// -----------------------------------------------------------------------------
export const createPlayBoardGrid =
  (x: number) =>
  (y: number): Board => {
    return new Array(x)
      .fill(undefined)
      .map(() => new Array(y).fill("empty" as Slot)) as Board;
  };
// -----------------------------------------------------------------------------
export const doesSlotExist = (playBoard: Board) => (pos: Position) =>
  !!getBoardValByPos(playBoard)(pos);
// -----------------------------------------------------------------------------
export const setSlot =
  (playBoard: Board) =>
  (pos: Position) =>
  (value: Piece): Board => {
    const board = structuredClone(playBoard);
    board[pos[0]][pos[1]] = value;
    return board;
  };
// -----------------------------------------------------------------------------
export const getHighestEmptySlotInColumn = (column: Column) => {
  let val = -1;
  column.forEach((v, i) => {
    if (v === "empty") val = i;
  });
  return val;
};
// -----------------------------------------------------------------------------
export const getMaxDiagonalLength = (playBoard: Board) => playBoard[0].length;
// -----------------------------------------------------------------------------
export const deriveGameBoardByConnectionParam = (connectionParam: number) => {
  const w = connectionParam * 2 - 1;
  return [w, w - 1];
};
// -----------------------------------------------------------------------------
