import { useContext, type FC } from "react";

import { StyledColumn, StyledGameBoard } from "./styled";
import AppContext from "../../../App.context";
import {
  effectGetLongestConnByPos,
  getActionByColumnDrop,
} from "../../../gameLogic";
import { StyledSlot } from "../../scaffold";

const GameBoard: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const onColumnClick = (x: number) => {
    if (dispatch && state.currentGame?.board) {
      const action = getActionByColumnDrop(state.currentGame?.board)(x)(
        state.currentPiece,
      );
      if (state.currentPiece === "blue") {
        dispatch(["currentPiece", "red"]);
      } else {
        dispatch(["currentPiece", "blue"]);
      }
      const connection =
        action === undefined ? [] : effectGetLongestConnByPos(action);
      if (action?.updatedBoard)
        dispatch([
          "currentGame",
          {
            ...state.currentGame,
            board: action?.updatedBoard,
          },
        ]);
      if (connection.length === state.currentGame.connectLength) {
        dispatch([
          "currentGame",
          {
            ...state.currentGame,
            winner: state.currentPiece,
          },
        ]);
      }
    }
  };
  console.log(state.currentGame);
  return (
    <StyledGameBoard>
      {state.currentGame?.board.map((v, i) => (
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
