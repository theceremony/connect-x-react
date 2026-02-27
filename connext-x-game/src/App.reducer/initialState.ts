import { PLAYER_COLORS } from "@/gameLogic";
import type { Game, Lobby, Piece } from "@/gameLogic/types";
import { generateRoom } from "@/utils";

const room = generateRoom();

export const initialState = {
  room,
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  currentPiece: PLAYER_COLORS[0] as Piece,
  previousGames: [] as Game[],
} as const;
