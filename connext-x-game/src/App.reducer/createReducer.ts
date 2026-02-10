import { basicReducerHook } from "./basic";
import type {
  Action,
  ActionKeys,
  MappedReducerHooks,
  ReducerHooks,
  State,
} from "./types";

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
  (state: State = ins, action: Action) => ({
    ...state,
    [action[_KEY_INDEX]]: getReducerHookByKey(regHooks)(
      action[_KEY_INDEX],
    ).reduce((acc: Action, v: ReducerHooks) => v(acc, state), action)[
      _VALUE_INDEX
    ],
  });
// -----------------------------------------------------------------------------
