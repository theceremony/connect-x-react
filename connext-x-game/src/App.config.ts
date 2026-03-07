import b2 from "./assets/anime-beach.gif";

import b9 from "./assets/gifBkg/bkg-no-theme.gif";
import b7 from "./assets/gifBkg/funbkg-scifi-anime-beach2.gif";
import b4 from "./assets/gifBkg/funbkg-scifi-anime-cozy.gif";
import b3 from "./assets/gifBkg/funbkg-scifi-anime-fantasy.gif";
import b6 from "./assets/gifBkg/funbkg-scifi-anime-monster.gif";
import b8 from "./assets/gifBkg/funbkg-scifi-anime-scifi2.gif";
import b5 from "./assets/gifBkg/funbkg-scifi-anime-spooky.gif";
import b1 from "./assets/gifBkg/funbkg-scifi-anime.gif";
export const BACKGROUNDS = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
export const COMPLEXITY_LEVEL = 16;
export const TIMING = {
  TEN_MINUTES: 600000,
  THREE_MINUTES: 180000,
  THIRTY_SECONDS: 30000,
  FORTY_FIVE_SECONDS: 45000,
  ONE_MINUTE: 60000,
} as const;

export const URL_PARAMS = {
  ROOM: "r",
  MASTER_ID: "m",
  GAME_MODE: "g",
} as const;

export const URL_PARAMS_STATE_ENUM = {
  [URL_PARAMS.ROOM]: "room",
  [URL_PARAMS.MASTER_ID]: "masterId",
  [URL_PARAMS.GAME_MODE]: "gameMode",
} as const;

export type UrlParamsEnum = typeof URL_PARAMS_STATE_ENUM;

export type UrlParamEnumKeys = keyof UrlParamsEnum;
