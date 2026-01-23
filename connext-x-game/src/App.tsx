import "./App.css";
import {
  createPlayBoardGrid,
  setSlotByColumnDrop,
  sideEffectGetLongestConnectLength,
} from "./logic";

function App() {
  const gameBoard = createPlayBoardGrid(7)(6);
  const updateAction = setSlotByColumnDrop(gameBoard)(2)("red");
  const updateAction2 =
    updateAction && setSlotByColumnDrop(updateAction.updatedBoard)(2)("blue");
  const updateAction3 =
    updateAction2 && setSlotByColumnDrop(updateAction2.updatedBoard)(2)("red");
  console.table(updateAction3?.updatedBoard);

  const connection =
    updateAction3 === undefined
      ? 0
      : sideEffectGetLongestConnectLength(updateAction3);
  console.log(connection);

  return (
    <>
      <div>connect X</div>
    </>
  );
}

export default App;
