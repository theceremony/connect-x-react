// -----------------------------------------------------------------------------

import type { Board, Slot, Piece, Column } from "./types";

// -----------------------------------------------------------------------------
export const createPlayBoardGrid =
  (x: number) =>
  (y: number): Board => {
    return new Array(x)
      .fill(undefined)
      .map(() => new Array(y).fill("empty" as Slot)) as Board;
  };
// -----------------------------------------------------------------------------
export const doesSlotExist = (playBoard: Board) => (x: number) => (y: number) =>
  !!playBoard[x][y];
// -----------------------------------------------------------------------------
export const setSlot =
  (playBoard: Board) =>
  (x: number) =>
  (y: number) =>
  (value: Piece): Board => {
    const board = structuredClone(playBoard);
    board[x][y] = value;
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
