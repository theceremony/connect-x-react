import { URL_PARAMS } from "@/App.config";
import Sqids from "sqids";
import { v1 as uuid } from "uuid";
export const shuffleString = (str: string) => {
  const arr = str.split("");
  let n = arr.length;
  while (n > 0) {
    const i = Math.floor(Math.random() * n);
    n--;
    [arr[n], arr[i]] = [arr[i], arr[n]];
  }
  return arr.join("");
};

export const generateRoomId = () => uuid();

export const generatePlayerId = () => {
  const alphabet = shuffleString(
    "k3G7QAe51FCsPW92uEOyq4Bg6Sp8YzVTmnU0liwDdHXLajZrfxNhobJIRcMvKt",
  );
  const sqids = new Sqids({
    alphabet,
  });
  return sqids.encode([1, 2, 3]);
};

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const generateRoom = (prefix: string = "") => {
  const id = getParamFromURL(URL_PARAMS.ROOM);
  return id !== "default"
    ? id
    : encodeURI(`${prefix}${generateRoomId()}`).replaceAll("-", "");
};

export const generateMasterId = (prefix: string = "") => {
  const id = getParamFromURL(URL_PARAMS.MASTER_ID);
  return id !== "default" ? id : encodeURI(`${prefix}${generatePlayerId()}`);
};

export const getParamFromURL = (param: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(param) || "default";
};

export const getRandomArrayValue = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
