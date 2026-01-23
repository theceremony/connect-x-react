import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
} from "./playSpaceControl";
import type { Action, Board, Piece, Position, Slot } from "./types";

export const getVerticalConnectLength =
  (playBoard: Board) => (x: number) => (y: number) => (value: Slot) => {
    const con = [];

    const column = playBoard[x];

    for (let f = y; f < column.length; ++f) {
      if (value === column[f]) {
        con.push({
          x,
          y: f,
        } as Position);
      } else {
        break;
      }
    }

    for (let b = y - 1; b > -1; --b) {
      if (value === column[b]) {
        con.push({
          x,
          y: b,
        } as Position);
      } else {
        break;
      }
    }

    return con;
  };

export const sideEffectGetLongestConnection = ({
  updatedBoard,
  position: { x, y },
}: Action) => {
  //temp
  return getVerticalConnectLength(updatedBoard)(x)(y)(updatedBoard[x][y]);
};

// -----------------------------------------------------------------------------
export const setSlotByColumnDrop =
  (playBoard: Board) => (x: number) => (value: Piece) => {
    const slotY = getHighestEmptySlotInColumn(playBoard[x]);

    if (doesSlotExist(playBoard)(x)(slotY)) {
      return {
        updatedBoard: setSlot(playBoard)(x)(slotY)(value),
        position: {
          x,
          y: slotY,
        },
      } as Action;
    } else {
      return undefined;
    }
  };
// -----------------------------------------------------------------------------
