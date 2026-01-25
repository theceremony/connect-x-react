export type Piece = "red" | "blue" | "yellow" | "green";
export type Slot = "empty" | Piece;
export type Position = {
  x: number;
  y: number;
};
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
