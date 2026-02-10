import { basicReducerHook } from "./basic";
import type { Action, ActionKeys, MappedReducerHooks, State } from "./types";

const _KEY_INDEX = 0;
const _VALUE_INDEX = 1;
// -----------------------------------------------------------------------------
export const getReducerHookByKey =
  (regHooks: MappedReducerHooks) => (key: ActionKeys) => [
    basicReducerHook,
    ...regHooks.filter(([mKey]) => key === mKey).map((v) => v[1]),
  ];

// -----------------------------------------------------------------------------
export const createAppReducer =
  (ins: State) =>
  (regHooks: MappedReducerHooks) =>
  (s: State = ins, a: Action) => ({
    ...s,
    [a[_KEY_INDEX]]: getReducerHookByKey(regHooks)(a[_KEY_INDEX]).reduce(
      (acc, v) => v(acc, s),
      a,
    )[_VALUE_INDEX],
  });
// -----------------------------------------------------------------------------
