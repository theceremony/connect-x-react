/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import {
  initialState,
  type Action,
  type Dispatch,
  type State,
} from "./App.reducer";

// -----------------------------------------------------------------------------
export type AppContextType = {
  state: State;
  dispatch: Dispatch;
};

// -----------------------------------------------------------------------------
const AppContext = createContext<AppContextType>({
  state: initialState as State,
  dispatch: (_action: Action) => {},
});
// -----------------------------------------------------------------------------
export default AppContext;
