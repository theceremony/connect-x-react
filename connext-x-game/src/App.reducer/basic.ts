import type { ReducerHooks } from "./types";

export const basicReducerHook: ReducerHooks = ([key, val]) => {
  console.log(`update ${key}`);
  return [key, val];
};
