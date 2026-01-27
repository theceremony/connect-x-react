import { useReducer } from "react";

import { StyledApp, StyleMessage } from "./App.styled";
import AppContext, { appReducer, initialState } from "./App.context";
import GameBoard from "./components/game/GameBoard";

import GameStateDisplay from "./components/game/GameStateDisplay";
import NewGame from "./components/setup/NewGame";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const onNewGameClick = () => {
    if (state.currentGame) {
      dispatch(["previousGames", [...state.previousGames, state.currentGame]]);
      dispatch(["currentGame", undefined]);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledApp>
        {state.currentGame === undefined && <NewGame />}
        {state.currentGame?.winner && (
          <StyleMessage>
            <h1 className="large-message-headline">Winner!</h1>
            <h1>{state.currentGame?.winner}</h1>
            <button onClick={onNewGameClick}>New Game</button>
          </StyleMessage>
        )}

        {state.currentGame && !state.currentGame?.winner && (
          <GameStateDisplay />
        )}
        {state.currentGame && <GameBoard />}
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
