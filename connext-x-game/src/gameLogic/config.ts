import type { Vector } from "./types";

// GAME_LOGIC_SETTINGS ---------------------------------------------------------
export const CONNECTION_VECTORS: Vector[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];
// PLAY_CONFIGURATION ----------------------------------------------------------
export const PlayerColors = ["red", "blue", "yellow", "green"];
// DEFAULTS --------------------------------------------------------------------
export const DEFAULT_CONNECTION_LENGTH = 4;
export const DEFAULT_NUMBER_OF_PLAYERS = 2;
