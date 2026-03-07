import { COMPLEXITY_LEVEL } from "@/App.config";
import AppContext from "@/App.context";
import { SimpleSlot, StyledSlot } from "@/components/scaffold";
import { effectGetLongestConnByPos, getActionByColumnDrop } from "@/gameLogic";
import type { Connection, Game, Player, Position } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import type { PlayerActionSocketData } from "@/netCode/types";
import { clamp } from "@/utils";
import { AnimatePresence, type Variants } from "motion/react";
import {
  Activity,
  type FC,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  StyledColumn,
  StyledColumnSelect,
  StyledColumnSelectContainer,
  StyledGameBoard,
  StyledGameBoardContainer,
  StyledSlotBackground,
  StyledSlotContainer,
} from "./styled";
//------------------------------------------------------------------------------
const GameBoard: FC = () => {
  const {
    state: { currentGame, gameMode },
    dispatch,
  } = useContext(AppContext);

  const getCurrentPlayer = () => {
    if (currentGame && currentGame.players) {
      return currentGame.players[currentGame?.currentPlayerIndex || 0];
    }
    return undefined;
  };
  const [didDrop, setDidDrop] = useState<boolean>(false);
  const currentPiece = getCurrentPlayer()?.piece;
  // ---------------------------------------------------------------------------
  const getNextPlayerIndex = (c: Game) => {
    if (
      c.currentPlayerIndex === undefined ||
      c.players === undefined ||
      c.players.length < 2
    )
      return 0;
    const nextIndex = c?.currentPlayerIndex + 1;
    const returnIndex = nextIndex >= c.players.length ? 0 : nextIndex;
    return returnIndex;
  };
  // ---------------------------------------------------------------------------
  const isWinner = (connection: Connection) => {
    if (!currentGame || !currentGame.connectLength) return false;
    return connection.length >= currentGame.connectLength;
  }; // TODO: this logic should probably be moved to game logic...
  // ---------------------------------------------------------------------------
  const onColumnDrop = (x: number) => {
    const currentPlayer = getCurrentPlayer();
    if (dispatch && currentGame?.board && currentPlayer) {
      const action = getActionByColumnDrop(currentGame?.board)(x)(
        currentPlayer.piece,
      );
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
  // ---------------------------------------------------------------------------
  const isSlotWinner = (pos: Position) => {
    if (currentGame?.winningConnection) {
      const winCon = currentGame?.winningConnection;
      for (let i = 0; i < winCon.length; ++i) {
        if (winCon[i][0] === pos[0] && winCon[i][1] === pos[1]) return true;
      }
      return false;
    }
  };
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
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
  // ---------------------------------------------------------------------------
  const getCurrentPlayerColumn = (currentGame: Game) => {
    const currentPlayer = getCurrentPlayer();
    if (currentPlayer && currentPlayer.selectedColumnIndex !== undefined)
      return currentPlayer.selectedColumnIndex;

    return Math.floor(currentGame.board.length / 2);
  };
  // ---------------------------------------------------------------------------
  const onPlayerAction = useEffectEvent(
    ({ id, action }: PlayerActionSocketData) => {
      const currentPlayer = getCurrentPlayer();
      if (currentPlayer?.id === id && currentGame) {
        if (action !== "drop") {
          const updatedGame = updatePlayerById(currentGame)(id)({
            ...currentPlayer,
            selectedColumnIndex: clamp(
              getCurrentPlayerColumn(currentGame) +
                (action === "move-left" ? -1 : 1),
              0,
              currentGame.board.length - 1,
            ),
          });
          console.table(updatedGame?.players);
          console.log(action);
          setDidDrop(false);
          dispatch(["currentGame", updatedGame]);
        }
        if (action === "drop" && currentGame) {
          setDidDrop(true);
          onColumnDrop(getCurrentPlayerColumn(currentGame));
        }
      }
    },
  );
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const isPlayer = gameMode === "player";
    if (isPlayer) return () => {};
    socket.on("tg:player-action", onPlayerAction);
    return () => {
      socket.removeListener("tg:player-action", onPlayerAction);
    };
  }, [gameMode]);
  // ---------------------------------------------------------------------------
  const getCurrentSelectedColumn = () => {
    if (currentGame === undefined) return undefined;
    return getCurrentPlayerColumn(currentGame);
  };
  // ---------------------------------------------------------------------------
  const curCol = getCurrentSelectedColumn();
  // ---------------------------------------------------------------------------
  if (!currentGame) return <div>error</div>;
  // ---------------------------------------------------------------------------

  const slotVariants: Variants = {
    // `custom` prop is passed here
    initial: { y: -300, scale: 2, rotateY: 180 },
    animate: { y: 0, scale: 1, rotateY: 0 },
    exit: (custom: boolean) => ({
      y: custom ? 800 : -300,
      scale: custom ? 1 : 2,
      rotateY: custom ? 0 : 180,
      transition: {
        duration: custom ? 0.2 : 0.3,
        ease: custom ? "backIn" : "backIn",
      },
    }),
  };

  return (
    <StyledGameBoardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="game-board-key"
    >
      <StyledColumnSelectContainer layout>
        {currentGame?.board.map((v, x) => (
          <StyledColumnSelect layout>
            <Activity mode={v.length > COMPLEXITY_LEVEL ? "visible" : "hidden"}>
              <SimpleSlot
                key={`slot-${x}`}
                data-slot-border={true}
                data-slot-color={curCol === x ? currentPiece : "hidden"}
              ></SimpleSlot>
            </Activity>
            <AnimatePresence
              mode="popLayout"
              custom={didDrop}
              onExitComplete={() => {}}
            >
              {curCol === x && v.length <= COMPLEXITY_LEVEL && (
                <StyledSlot
                  key={`slot-${x}-${currentPiece}`}
                  data-slot-border={true}
                  data-slot-color={curCol === x ? currentPiece : "hidden"}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={slotVariants}
                  transition={{ duration: 0.2, delay: 0.4, ease: "backOut" }}
                >
                  {" "}
                </StyledSlot>
              )}
            </AnimatePresence>
          </StyledColumnSelect>
        ))}
      </StyledColumnSelectContainer>
      <StyledGameBoard
        layout
        data-simple={currentGame?.board[0].length > COMPLEXITY_LEVEL}
      >
        {currentGame?.board.map((v, x) => (
          <StyledColumn
            layout
            key={`column_${x}`}
            // onClick={() => onColumnDrop(x)}
            data-column-selected={curCol === x}
          >
            {v.map((c, y) => (
              <>
                <Activity
                  mode={v.length > COMPLEXITY_LEVEL ? "visible" : "hidden"}
                >
                  <SimpleSlot
                    data-column-selected={curCol === x}
                    key={`slot-${y}`}
                    data-slot-winner={isSlotWinner([x, y])}
                    data-slot-color={c}
                  ></SimpleSlot>
                </Activity>
                <Activity
                  mode={v.length <= COMPLEXITY_LEVEL ? "visible" : "hidden"}
                >
                  <StyledSlotContainer layout>
                    <StyledSlotBackground layout></StyledSlotBackground>
                    <StyledSlot
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      key={`slot-${y}-${c}`}
                      data-slot-winner={isSlotWinner([x, y])}
                      data-slot-color={c}
                      data-column-selected={curCol === x}
                    >
                      {" "}
                    </StyledSlot>
                  </StyledSlotContainer>
                </Activity>
              </>
            ))}
          </StyledColumn>
        ))}
      </StyledGameBoard>
    </StyledGameBoardContainer>
  );
};
//------------------------------------------------------------------------------
export default GameBoard;
