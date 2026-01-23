// -----------------------------------------------------------------------------
export type Piece = "red" | "blue";
export type Slot = "empty" | Piece;
export type Column = Slot[];
export type Board = Column[];
// -----------------------------------------------------------------------------
export const createPlayBoardGrid =
  (x: number) =>
  (y: number): Board =>
    new Array(x).fill(new Array(y).fill("empty" as Slot)) as Board;
// -----------------------------------------------------------------------------
export const setSlot =
  (playBoard: Board) =>
  (x: number) =>
  (y: number) =>
  (value: Piece): Board => {
    const board = [...playBoard];
    board[x][y] = value;
    return board;
  };
// -----------------------------------------------------------------------------
export const getHighestEmptySlotInColumn = (column: Column) =>
  column.findIndex(
    (slot, i, arr) =>
      slot === "empty" && arr[i] !== "empty" && arr[i] !== undefined,
  );
// -----------------------------------------------------------------------------
export const setSlotByColumnDrop =
  (playBoard: Board) => (x: number) => (value: Piece) =>
    setSlot(playBoard)(x)(getHighestEmptySlotInColumn(playBoard[x]))(value);
// -----------------------------------------------------------------------------
