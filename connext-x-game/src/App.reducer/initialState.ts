import { BACKGROUNDS } from "@/App.config";
import type { Game, Lobby } from "@/gameLogic/types";
import { generateRoom, getRandomArrayValue } from "@/utils";
import type { Theme } from "./types";
//------------------------------------------------------------------------------
const room = generateRoom();
const currentBackground = getRandomArrayValue<string>(BACKGROUNDS);
//------------------------------------------------------------------------------
export const INITIAL_STATE = {
  room,
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  previousGames: [] as Game[],
  theme: {
    style: "Anime",
    currentBackground,
  } as Theme,
} as const;
// -----------------------------------------------------------------------------
