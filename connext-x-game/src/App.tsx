import { useState } from "react";
import "./App.css";
import {
  createPlayBoardGrid,
  deriveGameBoardByConnectionParam,
  setSlotByColumnDrop,
  sideEffectGetLongestConnectionForPosition,
} from "./logic";
import { type Piece, type Board } from "./logic/types";

// const _PLAY_BOARD = [7, 6];
// const _PLAY_BOARD = [7, 6];
// const _WINNING_CONNECTION_LENGTH = 6;

function App() {
  const winningConnectionLength = 5;
  const boardSize = deriveGameBoardByConnectionParam(winningConnectionLength);
  const [boardState, setBoardState] = useState<Board>(
    createPlayBoardGrid(boardSize[0])(boardSize[1]),
  );
  const [currentPiece, setCurrentPiece] = useState<Piece>("blue");
  const [winner, setWinner] = useState<undefined | Piece>(undefined);

  const onColumnClick = (x: number) => {
    const action = setSlotByColumnDrop(boardState)(x)(currentPiece);
    if (currentPiece === "blue") {
      setCurrentPiece("red");
    } else {
      setCurrentPiece("blue");
    }

    console.table(action?.updatedBoard);

    const connection =
      action === undefined
        ? []
        : sideEffectGetLongestConnectionForPosition(action);
    console.table(connection);
    if (action?.updatedBoard) setBoardState(action?.updatedBoard);
    if (connection.length === winningConnectionLength) setWinner(currentPiece);
  };

  return (
    <div className="app">
      {winner && <h1>winner: {winner}</h1>}
      {!winner && (
        <>
          <div className="current-display">
            <h1>current player</h1>
            <div className={`current-player slot ${currentPiece}`}></div>
          </div>
          <h3>connect {winningConnectionLength} to win</h3>
          <div className="board">
            {boardState.map((v, i) => (
              <div className="column" onClick={() => onColumnClick(i)}>
                {v.map((c) => (
                  <div className={`slot ${c}`}> </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
