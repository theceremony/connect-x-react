import AppContext from "@/App.context";

import { Activity, type FC, lazy, Suspense, useContext } from "react";
const GameBoard = lazy(() => import("@/components/game/GameBoard"));
const GameStateDisplay = lazy(
  () => import("@/components/game/GameStateDisplay"),
);
const Message = lazy(() => import("@/components/feedback/Message"));
const NewGame = lazy(() => import("@/components/game/NewGame"));

const GameController: FC = () => {
  const { state } = useContext(AppContext);
  return (
    <>
      <Activity mode={state.currentGame === undefined ? "visible" : "hidden"}>
        <Suspense>
          <NewGame />
        </Suspense>
      </Activity>

      <Activity mode={state.currentGame?.winner ? "visible" : "hidden"}>
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

export default GameController;
