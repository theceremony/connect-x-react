import { useReducer } from "react";

import { StyledApp, StyleMessage } from "./App.styled";
import AppContext, { appReducer, initialState } from "./App.context";
import GameBoard from "./components/game/GameBoard";

import GameStateDisplay from "./components/game/GameStateDisplay";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledApp>
        {state.winner && (
          <StyleMessage>
            <h1 className="large-message-headline">Winner!</h1>
            <h1>{state.winner}</h1>
            <button>New Game</button>
          </StyleMessage>
        )}
        {/* <NewGame /> */}
        <GameStateDisplay />
        <GameBoard />
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
