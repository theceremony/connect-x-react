import { useState } from "react";
import "./App.css";
import {
  createPlayBoardGrid,
  setSlotByColumnDrop,
  sideEffectGetLongestConnection,
} from "./logic";
import type { Board } from "./logic/types";

const _PLAY_BOARD_1 = [7, 6];
const _PLAY_BOARD_2 = [30, 30];

function App() {
  const [boardState, setBoardState] = useState<Board>(
    createPlayBoardGrid(_PLAY_BOARD_2[0])(_PLAY_BOARD_2[1]),
  );

  const onSubmit = () => {
    const action = setSlotByColumnDrop(boardState)(2)("red");
    console.table(action?.updatedBoard);

    const connection =
      action === undefined ? 0 : sideEffectGetLongestConnection(action);
    console.table(connection);
    if (action?.updatedBoard) setBoardState(action?.updatedBoard);
  };

  return (
    <>
      <div>
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
      </div>
      <div className="board">
        {boardState.map((v) => (
          <div className="column">
            {v.map((c) => (
              <div className={`slot ${c}`}> </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
