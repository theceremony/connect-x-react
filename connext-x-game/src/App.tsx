import { useState } from "react";

import {
  deriveGameBoardByConnectionParam,
  generateGame,
  getActionByColumnDrop,
  effectGetLongestConnByPos,
  DEFAULT_CONNECTION_LENGTH,
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
  const [winningConnectionLength] = useState<number>(DEFAULT_CONNECTION_LENGTH);

  const boardSize = deriveGameBoardByConnectionParam(winningConnectionLength);
  const [gameState, setGameState] = useState<Board>(generateGame(boardSize));
  const [currentPiece, setCurrentPiece] = useState<Piece>("blue");
  const [winner, setWinner] = useState<undefined | Piece>(undefined);

  const onColumnClick = (x: number) => {
    const action = getActionByColumnDrop(gameState)(x)(currentPiece);
    if (currentPiece === "blue") {
      setCurrentPiece("red");
    } else {
      setCurrentPiece("blue");
    }
    const connection =
      action === undefined ? [] : effectGetLongestConnByPos(action);
    if (action?.updatedBoard) setGameState(action?.updatedBoard);
    if (connection.length === winningConnectionLength) setWinner(currentPiece);
  };

  return (
    <StyledApp>
      {winner && (
        <StyleMessage>
          <h1 className="large-message-headline">Winner!</h1>
          <h1>{winner}</h1>
          <button>New Game</button>
        </StyleMessage>
      )}

      <>
        <StyledGameInterface>
          <h1>current player</h1>
          <StyledSlot
            data-slot-color={currentPiece}
            className={`current-player slot ${currentPiece}`}
          ></StyledSlot>
          <h2>connect {winningConnectionLength} to win</h2>
        </StyledGameInterface>

        <StyledBoard>
          {gameState.map((v, i) => (
            <StyledColumn key={`column_${i}`} onClick={() => onColumnClick(i)}>
              {v.map((c, a) => (
                <StyledSlot key={`slot-${a}`} data-slot-color={c}>
                  {" "}
                </StyledSlot>
              ))}
            </StyledColumn>
          ))}
        </StyledBoard>
      </>
    </StyledApp>
  );
}

export default App;
