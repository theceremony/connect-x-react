import AppContext from "@/App.context";
import { StyledSlot } from "@/components/scaffold";
import {
  PLAYER_COLORS,
  effectGetLongestConnByPos,
  getActionByColumnDrop,
} from "@/gameLogic";
import type { Connection, Piece, Position } from "@/gameLogic/types";
import { type FC, useContext } from "react";
import { StyledColumn, StyledGameBoard } from "./styled";

const GameBoard: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const getNextPiece = (currentPiece: Piece) => {
    const pieces =
      state.currentGame?.players?.map((p) => p.piece) ??
      PLAYER_COLORS.slice(
        0,
        state.currentGame?.players?.length ?? PLAYER_COLORS.length,
      );

    const currentIndex = pieces.indexOf(currentPiece);
    const nextIndex =
      currentIndex === -1 || currentIndex === pieces.length - 1
        ? 0
        : currentIndex + 1;

    return pieces[nextIndex] as Piece;
  };
  const isWinner = (connection: Connection) =>
    connection.length === state.currentGame?.connectLength;
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
            winningConnection: isWinner(connection) ? connection : undefined,
            winner: isWinner(connection) ? state.currentPiece : undefined,
          },
        ]);
    }
  };
  const isSlotWinner = (pos: Position) => {
    if (state.currentGame?.winningConnection) {
      const winCon = state.currentGame?.winningConnection;
      for (let i = 0; i < winCon.length; ++i) {
        if (winCon[i][0] === pos[0] && winCon[i][1] === pos[1]) return true;
      }
      return false;
    }
  };
  return (
    <StyledGameBoard>
      {state.currentGame?.board.map((v, x) => (
        <StyledColumn key={`column_${x}`} onClick={() => onColumnClick(x)}>
          {v.map((c, y) => (
            <StyledSlot
              key={`slot-${y}`}
              data-slot-winner={isSlotWinner([x, y])}
              data-slot-color={c}
            >
              {" "}
            </StyledSlot>
          ))}
        </StyledColumn>
      ))}
    </StyledGameBoard>
  );
};

export default GameBoard;
