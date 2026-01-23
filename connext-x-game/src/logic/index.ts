// -----------------------------------------------------------------------------
export type Piece = "red" | "blue";
export type Slot = "empty" | Piece;
export type Column = Slot[];
export type Board = Column[];
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
export const setSlotByColumnDrop =
  (playBoard: Board) => (x: number) => (value: Piece) => {
    const slot = getHighestEmptySlotInColumn(playBoard[x]);

    if (doesSlotExist(playBoard)(x)(slot)) {
      return setSlot(playBoard)(x)(slot)(value);
    } else {
      return undefined;
    }
  };
// -----------------------------------------------------------------------------
