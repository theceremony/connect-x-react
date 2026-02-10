import { basicReducerHook } from "./basic";
import type {
  Action,
  ActionKeys,
  MappedReducerHooks,
  ReducerHooks,
  State,
} from "./types";

export const getReducerHookByKey =
  (regHooks: MappedReducerHooks) => (key: ActionKeys) => [
    basicReducerHook,
    ...regHooks.filter(([mKey]) => key === mKey).map((v) => v[1]),
  ];

// -----------------------------------------------------------------------------
export const createAppReducer =
  (ins: State) =>
  (regHooks: MappedReducerHooks) =>
  (state: State = ins, action: Action) => ({
    ...state,
    [action[0]]: getReducerHookByKey(regHooks)(action[0]).reduce(
      (acc: Action, v: ReducerHooks) => v(acc, state),
      action,
    )[1],
  });
