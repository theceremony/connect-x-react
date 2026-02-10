import { initialState } from "./initialState";

// -----------------------------------------------------------------------------
export type State = typeof initialState;
// -----------------------------------------------------------------------------
export type ActionKeys = keyof State;
export type ActionValues = State[keyof State];
export type Action = [ActionKeys, Partial<ActionValues>];
export type Dispatch = React.ActionDispatch<[action: Action]>;
// -----------------------------------------------------------------------------
export type ReducerHooks = (action: Action, state: State) => Action;
export type KeyedReducerHook = [ActionKeys, ReducerHooks];
export type MappedReducerHooks = KeyedReducerHook[];
// -----------------------------------------------------------------------------
