import {
  getHighestEmptySlotInColumn,
  doesSlotExist,
  setSlot,
  createPlayBoardGrid,
} from "./playSpaceControl";
// -----------------------------------------------------------------------------
import type { Action, Board, Connection, Piece, Position, Slot } from "./types";
type GetConnFunc = (
  p: Board,
) => (x: number) => (y: number) => (v: Slot) => Connection;
// -----------------------------------------------------------------------------
export const getDiagConn =
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
export const getHorizConn =
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
export const getVerConn =
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
export const getConn =
  (p: Board) => (x: number) => (y: number) => (v: Slot) => (fn: GetConnFunc) =>
    fn(p)(x)(y)(v);
// -----------------------------------------------------------------------------
export const effectGetLongestConnByPos = ({
  updatedBoard,
  position: { x, y },
}: Action) => {
  const fn = getConn(updatedBoard)(x)(y)(updatedBoard[x][y]);
  return [
    fn(getVerConn),
    fn(getHorizConn),
    fn(getDiagConn(1)),
    fn(getDiagConn(-1)),
  ].reduce(
    (acc, connection) => (acc.length > connection.length ? acc : connection),
    [] as Connection,
  );
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
    }
    return undefined;
  };
// -----------------------------------------------------------------------------
export const generateGame = (boardSize: number[]) =>
  createPlayBoardGrid(boardSize[0])(boardSize[1]);
// -----------------------------------------------------------------------------
export const getNumberOfEmptySlots = (playBoard: Board) =>
  playBoard.reduce((acc, c) => acc + c.filter((s) => s === "empty").length, 0);
