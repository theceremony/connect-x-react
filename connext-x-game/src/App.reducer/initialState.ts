import { PLAYER_COLORS } from "@/gameLogic";
import type { Game, Lobby, Piece } from "@/gameLogic/types";

export const initialState = {
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  currentPiece: PLAYER_COLORS[0] as Piece,
  previousGames: [] as Game[],
};
