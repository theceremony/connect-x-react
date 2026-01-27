import type { Piece, Vector } from "./types";

// GAME_LOGIC_SETTINGS ---------------------------------------------------------
export const CONNECTION_VECTORS: Vector[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];
// PLAY_CONFIGURATION ----------------------------------------------------------
export const PLAYER_COLORS = ["red", "yellow", "blue", "green"] as Piece[];
// DEFAULTS --------------------------------------------------------------------
export const DEFAULT_CONNECTION_LENGTH = 4;
export const DEFAULT_NUMBER_OF_PLAYERS = 2;
