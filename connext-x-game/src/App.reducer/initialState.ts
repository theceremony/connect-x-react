import { BACKGROUNDS } from "@/App.config";
import { PLAYER_COLORS } from "@/gameLogic";
import type { Game, Lobby, Piece } from "@/gameLogic/types";
import { generateRoom, getRandomArrayValue } from "@/utils";
//------------------------------------------------------------------------------
const room = generateRoom();
const currentBackground = getRandomArrayValue<string>(BACKGROUNDS);
//------------------------------------------------------------------------------
export const initialState = {
  room,
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  currentPiece: PLAYER_COLORS[0] as Piece,
  previousGames: [] as Game[],
  theme: {
    currentBackground,
  },
} as const;
// -----------------------------------------------------------------------------
