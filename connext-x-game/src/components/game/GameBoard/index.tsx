import AppContext from "@/App.context";
import { StyledSlot } from "@/components/scaffold";
import {
  PLAYER_COLORS,
  effectGetLongestConnByPos,
  getActionByColumnDrop,
} from "@/gameLogic";
import type {
  Connection,
  Game,
  Piece,
  Player,
  Position,
} from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import type { PlayerActionSocketData } from "@/netCode/types";
import { clamp } from "@/utils";
import { type FC, useContext, useEffect, useEffectEvent } from "react";
import { StyledColumn, StyledGameBoard } from "./styled";

const GameBoard: FC = () => {
  const {
    state: { currentGame, currentPiece },
    dispatch,
  } = useContext(AppContext);
  console.log(currentGame);
  const getNextPiece = (currentPiece: Piece) => {
    const pieces =
      currentGame?.players?.map((p) => p.piece) ??
      PLAYER_COLORS.slice(
        0,
        currentGame?.players?.length ?? PLAYER_COLORS.length,
      );

    const currentIndex = pieces.indexOf(currentPiece);
    const nextIndex =
      currentIndex === -1 || currentIndex === pieces.length - 1
        ? 0
        : currentIndex + 1;

    return pieces[nextIndex] as Piece;
  };

  const getNextPlayerIndex = (c: Game) => {
    if (
      c.currentPlayerIndex === undefined ||
      c.players === undefined ||
      c.players.length < 2
    )
      return 0;
    const nextIndex = c?.currentPlayerIndex + 1;
    const returnIndex = nextIndex >= c.players.length ? 0 : nextIndex;
    console.log({ nextIndex }, { returnIndex });
    return returnIndex;
  };

  const isWinner = (connection: Connection) =>
    connection.length === currentGame?.connectLength;

  const onColumnDrop = (x: number) => {
    const currentPlayer = getCurrentPlayer();
    if (dispatch && currentGame?.board && currentPlayer) {
      const action = getActionByColumnDrop(currentGame?.board)(x)(
        currentPlayer.piece,
      );
      if (currentGame.players)
        dispatch([
          "currentPiece",
          currentGame.players[getNextPlayerIndex(currentGame)].piece,
        ]);
      const connection =
        action === undefined ? [] : effectGetLongestConnByPos(action);
      if (action?.updatedBoard)
        dispatch([
          "currentGame",
          {
            ...currentGame,
            board: action?.updatedBoard,

            currentPlayerIndex: getNextPlayerIndex(currentGame),
            winningConnection: isWinner(connection) ? connection : undefined,
            winner: isWinner(connection) ? currentPiece : undefined,
          },
        ]);
    }
  };
  const isSlotWinner = (pos: Position) => {
    if (currentGame?.winningConnection) {
      const winCon = currentGame?.winningConnection;
      for (let i = 0; i < winCon.length; ++i) {
        if (winCon[i][0] === pos[0] && winCon[i][1] === pos[1]) return true;
      }
      return false;
    }
  };
  const getCurrentPlayer = () => {
    if (currentGame && currentGame.players) {
      return currentGame.players[currentGame?.currentPlayerIndex || 0];
    }
    return undefined;
  };
  const getPlayerById = (currentGame: Game) => (id: string) => {
    if (currentGame.players)
      return currentGame.players.filter((v) => v.id === id)[0];
  };
  const updatePlayerById =
    (currentGame: Game) => (id: string) => (update: Partial<Player>) => {
      if (currentGame.players) {
        const updateIndex = currentGame.players.findIndex((v) => v.id === id);
        const updatedPlayers = [...currentGame.players];
        updatedPlayers[updateIndex] = {
          ...updatedPlayers[updateIndex],
          ...update,
        };
        return {
          ...currentGame,
          players: [...updatedPlayers],
        } as Game;
      }
    };
  const getPlayerCurrentColumnByID = (currentGame: Game) => (id: string) =>
    getPlayerById(currentGame)(id)?.selectedColumnIndex ??
    Math.floor(currentGame.board.length / 2);

  const onPlayerAction = useEffectEvent(
    ({ id, action }: PlayerActionSocketData) => {
      const currentPlayer = getCurrentPlayer();
      if (action !== "drop") {
        if (currentPlayer?.id === id && currentGame) {
          const updatedGame = updatePlayerById(currentGame)(id)({
            ...currentPlayer,
            selectedColumnIndex: clamp(
              getPlayerCurrentColumnByID(currentGame)(id) +
                (action === "move-left" ? -1 : 1),
              0,
              currentGame.board.length - 1,
            ),
          });
          console.table(updatedGame?.players);
          console.log(action);
          dispatch(["currentGame", updatedGame]);
        }
      }
      if (action === "drop" && currentGame) {
        onColumnDrop(getPlayerCurrentColumnByID(currentGame)(id));
      }
    },
  );

  useEffect(() => {
    socket.on("tg:player-action", onPlayerAction);
    return () => {
      socket.removeListener("tg:player-action", onPlayerAction);
    };
  }, []);

  const getCurrentSelectedColumn = () => {
    if (currentGame === undefined) return undefined;
    return (
      getCurrentPlayer()?.selectedColumnIndex ||
      Math.floor(currentGame.board.length / 2)
    );
  };

  const curCol = getCurrentSelectedColumn();

  if (!currentGame) return <div>error</div>;
  return (
    <StyledGameBoard>
      {currentGame?.board.map((v, x) => (
        <StyledColumn
          key={`column_${x}`}
          // onClick={() => onColumnDrop(x)}
          data-column-selected={curCol === x}
        >
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
