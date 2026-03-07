import { BACKGROUNDS } from "@/App.config";
import type { Game, GameMode, Lobby } from "@/gameLogic/types";
import { generateMasterId, generateRoom, getRandomArrayValue } from "@/utils";
import { getCurrentParamsAsPartial } from "@/utils/params";
import type { Theme } from "./types";
//------------------------------------------------------------------------------
const room = generateRoom();
const currentBackground = getRandomArrayValue<string>(BACKGROUNDS);
//------------------------------------------------------------------------------

const params = getCurrentParamsAsPartial();

console.log(params);

export const INITIAL_STATE = {
  room,
  masterId: generateMasterId(),
  currentGame: undefined as undefined | Game,
  lobby: [] as Lobby,
  previousGames: [] as Game[],
  gameMode: "host" as GameMode,
  theme: {
    style: "Anime",
    currentBackground,
  } as Theme,
  ...params,
} as const;
// -----------------------------------------------------------------------------
