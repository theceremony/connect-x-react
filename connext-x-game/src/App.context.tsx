/* eslint-disable @typescript-eslint/no-unused-vars */
import { socket } from "@/netCode/socket";
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
  socket?: typeof socket;
};

// -----------------------------------------------------------------------------
const AppContext = createContext<AppContextType>({
  state: initialState as State,
  dispatch: (_action: Action) => {},
  socket: socket,
});
// -----------------------------------------------------------------------------
export default AppContext;
