//----------------------------------------------------------------------------
import AppContext from "@/App.context";
import { PLAYER_COLORS } from "@/gameLogic";
import type { Player } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import type { GameStatusSocketData } from "@/netCode/types";
import {
  Activity,
  type FC,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useEffectEvent,
} from "react";
//----------------------------------------------------------------------------
const GameBoard = lazy(() => import("@/components/game/GameBoard"));
const GameStateDisplay = lazy(
  () => import("@/components/game/GameStateDisplay"),
);
//----------------------------------------------------------------------------
const Message = lazy(() => import("@/components/feedback/Message"));
const NewGame = lazy(() => import("@/components/game/NewGame"));
//------------------------------------------------------------------------------
const GameController: FC = () => {
  //----------------------------------------------------------------------------
  const { state, dispatch } = useContext(AppContext);

  const onReqConn = useEffectEvent(
    ({ playerId }: { room: string; playerId: string }) => {
      if (state.lobby.length < PLAYER_COLORS.length) {
        const player =
          state.lobby.filter(({ id }) => id === playerId)[0] ||
          ({
            id: playerId,
            piece: PLAYER_COLORS.filter(
              (color) => !state.lobby.map(({ piece }) => piece).includes(color),
            )[0],
          } as Player);
        console.log("player connect", playerId);

        if (state.currentGame?.players) {
          const newPlayers = state.currentGame.players.map((v) => {
            if (v.piece === player.piece) return player;
            return v;
          });

          console.log(newPlayers);
          dispatch([
            "currentGame",
            {
              ...state.currentGame,
              players: newPlayers,
            },
          ]);
        }
        dispatch([
          "lobby",
          [
            ...state.lobby,
            {
              ...player,
            } as Player,
          ],
        ]);
      }
    },
  );

  // ===========================================================================
  const onDisconnect = useEffectEvent(({ id }: { id: string }) => {
    console.log("player disconnected!!!");

    dispatch([
      "lobby",
      [...state.lobby].filter((v) => {
        return id !== v.id;
      }),
    ]);
  });

  const onGameStatusUpdate = useEffectEvent(
    ({ gameStatus }: GameStatusSocketData) => {
      console.log("currentGame", gameStatus);
      dispatch(["currentGame", gameStatus]);
    },
  );

  useEffect(() => {
    const isPlayer = state.gameMode === "player";
    const isController = state.gameMode === "controller";
    if (socket && !(isPlayer || isController)) {
      socket.emit("fg:request-connection", { room: state.room });
      // -----------------------------------------------------------------------
      socket.on("tg:request-player-connection", onReqConn);
      // -----------------------------------------------------------------------
      socket.on("tg:disconnect", onDisconnect);
    }
    if (socket && (isPlayer || isController)) {
      socket.on("tap:game-status-update", onGameStatusUpdate);
    }

    // -------------------------------------------------------------------------
    return () => {
      console.log("removed");
      if (socket && (isPlayer || isController)) {
        socket.removeListener("tap:game-status-update", onGameStatusUpdate);
      }
      if (socket && !(isPlayer || isController)) {
        socket.removeListener("tg:request-player-connection", onReqConn);
        socket.removeListener("tg:disconnect", onDisconnect);
      }
    };
  }, [state.gameMode, state.room]);
  //----------------------------------------------------------------------------
  return (
    <>
      <Activity mode={state.currentGame === undefined ? "visible" : "hidden"}>
        <Suspense>
          <NewGame />
        </Suspense>
      </Activity>

      <Activity
        mode={
          state.currentGame !== undefined && state.currentGame?.winner
            ? "visible"
            : "hidden"
        }
      >
        <Suspense>
          <Message />
        </Suspense>
      </Activity>

      <Activity
        mode={
          state.currentGame && !state.currentGame?.winner ? "visible" : "hidden"
        }
      >
        <Suspense>
          <GameStateDisplay />
        </Suspense>
      </Activity>

      <Activity mode={state.currentGame ? "visible" : "hidden"}>
        <Suspense>
          <GameBoard />
        </Suspense>
      </Activity>
    </>
  );
};
//----------------------------------------------------------------------------
export default GameController;
