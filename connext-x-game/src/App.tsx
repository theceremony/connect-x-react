import { useReducer } from "react";

import { StyledApp } from "./App.styled";
import AppContext, { appReducer, initialState } from "./App.context";
import GameBoard from "./components/game/GameBoard";
import { socket } from "./netCode/socket";
import GameStateDisplay from "./components/game/GameStateDisplay";
import NewGame from "./components/setup/NewGame";
import Message from "./components/feedback/Message";
import Player from "./components/game/Player";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const path = window.location.pathname;
  if (path === "/player")
    return (
      <AppContext.Provider value={{ state, dispatch, socket }}>
        <Player />
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
