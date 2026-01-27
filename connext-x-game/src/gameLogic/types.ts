export type Piece = "red" | "blue" | "yellow" | "green";
export type Slot = "empty" | Piece;
export type Position = [number, number];
export type Column = Slot[];
export type Board = Column[];
export type Player = {
  piece: Piece;
  name: string;
};
export type Action = {
  updatedBoard: Board;
  position: Position;
};
export type Connection = Position[];
export type Move = {
  action: Action;
  player: Player;
};
export type Game = {
  board: Board;
  players: Player[];
};
export type GetConnFunc = (
  b: Board,
) => (p: Position) => (v: Slot) => Connection;
export type Vector = [number, number];
