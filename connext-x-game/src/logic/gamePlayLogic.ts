import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
} from "./playSpaceControl";
import type { Action, Board, Piece, Position, Slot } from "./types";
// -----------------------------------------------------------------------------
export const getHorizontalConnection =
  (playBoard: Board) => (x: number) => (y: number) => (value: Slot) => {
    const con = [];

    for (let f = x; f < playBoard.length; ++f) {
      if (value === playBoard[f][y]) {
        con.push({
          x: f,
          y,
        } as Position);
      } else {
        break;
      }
    }

    for (let b = x - 1; b > -1; --b) {
      if (value === playBoard[b][y]) {
        con.push({
          x: b,
          y,
        } as Position);
      } else {
        break;
      }
    }

    return con;
  };
// -----------------------------------------------------------------------------
export const getVerticalConnection =
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
// -----------------------------------------------------------------------------
export const sideEffectGetLongestConnectionForPosition = ({
  updatedBoard,
  position: { x, y },
}: Action) => {
  //temp
  const val = updatedBoard[x][y];
  const vertCon = getVerticalConnection(updatedBoard)(x)(y)(val);
  const horzCon = getHorizontalConnection(updatedBoard)(x)(y)(val);
  return vertCon.length > horzCon.length ? vertCon : horzCon;
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
