import { useReducer } from "react";

import {
  deriveGameBoardByConnectionParam,
  generateGame,
  getActionByColumnDrop,
  effectGetLongestConnByPos,
  DEFAULT_CONNECTION_LENGTH,
  DEFAULT_NUMBER_OF_PLAYERS,
  PLAYER_COLORS,
} from "./gameLogic";
import { type Piece, type Board } from "./gameLogic/types";
import {
  StyledApp,
  StyledBoard,
  StyledColumn,
  StyledGameInterface,
  StyledSlot,
  StyleMessage,
} from "./App.styled";
import NewGame from "./components/setup/NewGame";

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
  const boardSize = deriveGameBoardByConnectionParam(DEFAULT_CONNECTION_LENGTH)(
    DEFAULT_NUMBER_OF_PLAYERS,
  );

  const initialState = {
    winningConnectionLength: DEFAULT_CONNECTION_LENGTH,
    numberOfPlayers: DEFAULT_NUMBER_OF_PLAYERS,
    boardSize,
    gameState: generateGame(boardSize) as Board,
    currentPiece: PLAYER_COLORS[0] as Piece,
    winner: undefined,
  };
  type State = typeof initialState;
  type Action = [keyof State, State[keyof State]];
  const appReducer = (state: State, action: Action) => {
    return { ...state, [action[0]]: action[1] };
  };

  const [appState, dispatch] = useReducer(appReducer, initialState);

  const onColumnClick = (x: number) => {
    const action = getActionByColumnDrop(appState.gameState)(x)(
      appState.currentPiece,
    );
    if (appState.currentPiece === "blue") {
      dispatch(["currentPiece", "red"]);
    } else {
      dispatch(["currentPiece", "blue"]);
    }
    const connection =
      action === undefined ? [] : effectGetLongestConnByPos(action);
    if (action?.updatedBoard) dispatch(["gameState", action?.updatedBoard]);
    if (connection.length === appState.winningConnectionLength)
      dispatch(["winner", appState.currentPiece]);
  };

  return (
    <StyledApp>
      {appState.winner && (
        <StyleMessage>
          <h1 className="large-message-headline">Winner!</h1>
          <h1>{appState.winner}</h1>
          <button>New Game</button>
        </StyleMessage>
      )}
      {/* <NewGame /> */}
      <StyledGameInterface>
        <h1>current player</h1>
        <StyledSlot
          data-slot-color={appState.currentPiece}
          className={`current-player slot ${appState.currentPiece}`}
        ></StyledSlot>
        <h2>connect {appState.winningConnectionLength} to win</h2>
      </StyledGameInterface>

      <StyledBoard>
        {appState.gameState.map((v, i) => (
          <StyledColumn key={`column_${i}`} onClick={() => onColumnClick(i)}>
            {v.map((c, a) => (
              <StyledSlot key={`slot-${a}`} data-slot-color={c}>
                {" "}
              </StyledSlot>
            ))}
          </StyledColumn>
        ))}
      </StyledBoard>
    </StyledApp>
  );
}

export default App;
