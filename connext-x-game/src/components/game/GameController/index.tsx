//----------------------------------------------------------------------------
import AppContext from "@/App.context";
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

  const onGameStatusUpdate = useEffectEvent(
    ({ gameStatus }: GameStatusSocketData) => {
      dispatch(["currentGame", gameStatus]);
    },
  );

  useEffect(() => {
    const isPlayer = () => state.gameMode === "player";
    if (socket) {
      if (isPlayer()) {
        socket.on("tap:game-status-update", onGameStatusUpdate);
      }
    }
    // -------------------------------------------------------------------------
    return () => {
      if (socket) {
        socket.removeListener("tap:game-status-update", onGameStatusUpdate);
        socket.removeAllListeners();
      }
    };
  }, []);
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
