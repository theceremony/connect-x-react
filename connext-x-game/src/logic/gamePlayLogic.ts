import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
} from "./playSpaceControl";
import type { Action, Board, Connection, Piece, Position, Slot } from "./types";
// todo: doesn't seem to catch both ways
export const getDiagonalConnection =
  (way: number) =>
  (playBoard: Board) =>
  (x: number) =>
  (y: number) =>
  (value: Slot) => {
    const con = [];

    let upX = x;
    for (let f = y; f < playBoard[x].length; ++f) {
      if (playBoard[upX] && playBoard[upX][f] && value === playBoard[upX][f]) {
        con.push({
          x: upX,
          y: f,
        } as Position);
        upX += way;
      } else {
        break;
      }
    }
    let downX = x - 1;
    for (let b = y - 1; b > -1; --b) {
      if (
        playBoard[downX] &&
        playBoard[downX][b] &&
        value === playBoard[downX][b]
      ) {
        con.push({
          x: downX,
          y: b,
        } as Position);
        downX -= way;
      } else {
        break;
      }
    }

    return con;
  };

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
  const connections: Connection[] = [];
  connections.push(getVerticalConnection(updatedBoard)(x)(y)(val));
  connections.push(getHorizontalConnection(updatedBoard)(x)(y)(val));
  connections.push(getDiagonalConnection(1)(updatedBoard)(x)(y)(val));
  connections.push(getDiagonalConnection(-1)(updatedBoard)(x)(y)(val));

  let connection = connections[0];
  connections.forEach((v: Connection) => {
    if (v.length > connection.length) {
      connection = v;
    }
  });
  return connection;
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
