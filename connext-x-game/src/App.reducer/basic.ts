import type { ReducerHooks } from "./types";
//------------------------------------------------------------------------------
export const basicReducerHook: ReducerHooks = ([key, val]) => {
  return [key, val];
};
//------------------------------------------------------------------------------
