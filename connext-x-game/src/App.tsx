import { useState } from "react";
import "./App.css";
import {
  createPlayBoardGrid,
  setSlotByColumnDrop,
  sideEffectGetLongestConnectionForPosition,
} from "./logic";
import { type Piece, type Board } from "./logic/types";

// const _PLAY_BOARD = [7, 6];
const _PLAY_BOARD = [20, 19];

function App() {
  const [boardState, setBoardState] = useState<Board>(
    createPlayBoardGrid(_PLAY_BOARD[0])(_PLAY_BOARD[1]),
  );
  const [currentPiece, setCurrentPiece] = useState<Piece>("blue");

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
        ? 0
        : sideEffectGetLongestConnectionForPosition(action);
    console.table(connection);
    if (action?.updatedBoard) setBoardState(action?.updatedBoard);
  };

  return (
    <div className="app">
      {/* <div>
        <div>
          <label>Column</label>
          <input name="x" type="number" value="0" />
        </div>
        <div>
          <label>Color</label>
          <select name="color">
            <option value="red">red</option>
            <option value="blue">blue</option>
          </select>
        </div>
        <div>
          <button onClick={onSubmit}>Go!</button>
        </div>
      </div> */}
      <div className="current-display">
        <h1>current player</h1>
        <div className={`current-player slot ${currentPiece}`}></div>
      </div>
      <div className="board">
        {boardState.map((v, i) => (
          <div className="column" onClick={() => onColumnClick(i)}>
            {v.map((c) => (
              <div className={`slot ${c}`}> </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
