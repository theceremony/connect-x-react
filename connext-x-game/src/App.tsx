import { useReducer } from "react";

import { StyledApp, StyledGameInterface, StyleMessage } from "./App.styled";
import AppContext, {
  initialState,
  type Action,
  type State,
} from "./App.context";
import GameBoard from "./components/game/GameBoard";
import { StyledSlot } from "./components/scaffold";

// - -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
// -°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-
//TODO  [ ] explore socket / net code for 'Battle Mode', will probably need to
//      switch to a game engine and remove react
// -°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-
// -°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-
//TODO  [ ] Need to switch to a better state management system, useState is
//      trash
// -°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-
// - -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
// - -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
// -°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-
//NOTES:
// _____________________________________________________________________________
//
// I want to allow players to attach with phones via QR, if over 2 players the game board will have to expand I think, will have to figure out the multiplier
//
// Battlemode would remove turn based and just let people bang it out, would probably require a cool down between turns, should think of some other funny boon / penalties
// -°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-
// - -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

function App() {
  const appReducer = (state: State, action: Action) => {
    return { ...state, [action[0]]: action[1] };
  };

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
        <StyledGameInterface>
          <h1>current player</h1>
          <StyledSlot
            data-slot-color={state.currentPiece}
            className={`current-player slot ${state.currentPiece}`}
          ></StyledSlot>
          <h2>connect {state.winningConnectionLength} to win</h2>
        </StyledGameInterface>
        <GameBoard />
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
