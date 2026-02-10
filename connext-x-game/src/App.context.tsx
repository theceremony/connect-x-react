import { socket } from "@/netCode/socket";
import { createContext } from "react";
import { initialState, type Dispatch, type State } from "./App.reducer";

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
export type AppContextType = {
  state: State;

  dispatch?: Dispatch;
  socket?: typeof socket;
};

// -----------------------------------------------------------------------------
const AppContext = createContext<AppContextType>({
  state: initialState as State,

  socket: socket,
});
// -----------------------------------------------------------------------------
export default AppContext;
