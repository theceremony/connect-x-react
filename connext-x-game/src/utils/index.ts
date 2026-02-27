import { v4 as uuidv4 } from "uuid";
export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const generateRoom = (prefix: string = "") => {
  const urlRoom = getRoomFromURL();
  return urlRoom !== "default-room"
    ? urlRoom
    : encodeURI(`${prefix}${uuidv4()}`).replaceAll("-", "");
};

export const getRoomFromURL = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get("room") || "default-room";
};
