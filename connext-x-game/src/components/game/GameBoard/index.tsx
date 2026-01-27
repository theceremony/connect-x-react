import { useContext, type FC } from "react";

import { StyledColumn, StyledGameBoard } from "./styled";
import AppContext from "../../../App.context";
import {
  effectGetLongestConnByPos,
  getActionByColumnDrop,
} from "../../../gameLogic";
import { PLAYER_COLORS } from "../../../gameLogic/config";
import type { Piece } from "../../../gameLogic/types";
import { StyledSlot } from "../../scaffold";

const GameBoard: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const getNextPiece = (currentPiece: Piece) => {
    const pieces =
      state.currentGame?.players?.map((p) => p.piece) ??
      PLAYER_COLORS.slice(
        0,
        state.currentGame?.numberOfPlayers ?? PLAYER_COLORS.length,
      );

    const currentIndex = pieces.indexOf(currentPiece);
    const nextIndex =
      currentIndex === -1 || currentIndex === pieces.length - 1
        ? 0
        : currentIndex + 1;

    return pieces[nextIndex] as Piece;
  };
  const onColumnClick = (x: number) => {
    if (dispatch && state.currentGame?.board) {
      const action = getActionByColumnDrop(state.currentGame?.board)(x)(
        state.currentPiece,
      );
      dispatch(["currentPiece", getNextPiece(state.currentPiece)]);
      const connection =
        action === undefined ? [] : effectGetLongestConnByPos(action);
      if (action?.updatedBoard)
        dispatch([
          "currentGame",
          {
            ...state.currentGame,
            board: action?.updatedBoard,
            winner:
              connection.length === state.currentGame.connectLength
                ? state.currentPiece
                : undefined,
          },
        ]);
    }
  };

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
