export type Piece = "red" | "blue" | "yellow" | "green";
export type Slot = "empty" | Piece;
export type Position = [number, number];
export type Column = Slot[];
export type Board = Column[];
export type Player = {
  id: string;
  piece: Piece;
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
export type Lobby = Player[];
export type Game = {
  board: Board;
  connectLength: number;
  players?: Player[];
  winner?: Piece;
  winningConnection?: Connection;
  currentPlayerIndex?: number;
};

export type Vector = [number, number];
