import { useReducer } from "react";

import Message from "@/components/feedback/Message";
import GameBoard from "@/components/game/GameBoard";
import GameStateDisplay from "@/components/game/GameStateDisplay";
import AppContext, { appReducer, initialState } from "./App.context";
import { StyledApp } from "./App.styled";

import PlayerRemote from "@/components/game/PlayerRemote";
import NewGame from "@/components/setup/NewGame";
import { socket } from "@/netCode/socket";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const path = window.location.pathname;
  if (path === "/player")
    return (
      <AppContext.Provider value={{ state, dispatch, socket }}>
        <PlayerRemote />
      </AppContext.Provider>
    );
  return (
    <AppContext.Provider value={{ state, dispatch, socket }}>
      <StyledApp>
        {state.currentGame === undefined && <NewGame />}
        {state.currentGame?.winner && <Message />}

        {state.currentGame && !state.currentGame?.winner && (
          <GameStateDisplay />
        )}
        {state.currentGame && <GameBoard />}
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
