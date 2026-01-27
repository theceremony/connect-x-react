import { useEffect, useReducer, useState } from "react";

import { StyledApp } from "./App.styled";
import AppContext, { appReducer, initialState } from "./App.context";
import GameBoard from "./components/game/GameBoard";
import { socket } from "./netCode/socket";
import GameStateDisplay from "./components/game/GameStateDisplay";
import NewGame from "./components/setup/NewGame";
import Message from "./components/feedback/Message";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

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
