import { useContext, type FC } from "react";

import { StyledColumn, StyledGameBoard, StyledSlot } from "./styled";
import AppContext from "../../../App.context";
import {
  effectGetLongestConnByPos,
  getActionByColumnDrop,
} from "../../../gameLogic";

const GameBoard: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const onColumnClick = (x: number) => {
    if (dispatch) {
      const action = getActionByColumnDrop(state.gameState)(x)(
        state.currentPiece,
      );
      if (state.currentPiece === "blue") {
        dispatch(["currentPiece", "red"]);
      } else {
        dispatch(["currentPiece", "blue"]);
      }
      const connection =
        action === undefined ? [] : effectGetLongestConnByPos(action);
      if (action?.updatedBoard) dispatch(["gameState", action?.updatedBoard]);
      if (connection.length === state.winningConnectionLength)
        dispatch(["winner", state.currentPiece]);
    }
  };
  console.log(state.gameState);
  return (
    <StyledGameBoard>
      {state.gameState.map((v, i) => (
        <StyledColumn key={`column_${i}`} onClick={() => onColumnClick(i)}>
          {v.map((c, a) => (
            <StyledSlot key={`slot-${a}`} data-slot-color={c}>
              {" "}
            </StyledSlot>
          ))}
        </StyledColumn>
      ))}
    </StyledGameBoard>
  );
};

export default GameBoard;
