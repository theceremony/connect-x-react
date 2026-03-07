/* eslint-disable react-hooks/purity */
import { TIMING } from "@/App.config";
import AppContext from "@/App.context";
import { Activity, useContext, type FC } from "react";
import Countdown from "react-countdown";
import { StyledMessage } from "./styled";

type RenderParams = {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  milliseconds: number;
  completed: boolean;
};

const PausedMessage: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const isPlayer = () => state.gameMode === "player";

  const onNewGameClick = () => {
    if (state.currentGame && dispatch && !isPlayer()) {
      dispatch(["previousGames", [...state.previousGames, state.currentGame]]);
      dispatch(["currentGame", undefined]);
    }
  };
  const padNumber = (num: number, amount: number = 2) => {
    return String(num).padStart(amount, "0");
  };
  const renderer = ({ minutes, seconds, completed, total }: RenderParams) => {
    if (completed) {
      // Render a complete state
      return <h1>Player timed out, restarting</h1>;
    } else {
      // Render a countdown
      return (
        <>
          <h2>Will auto-restart in: </h2>
          <h1 className="number large-message-headline">
            {padNumber(minutes)}:{padNumber(seconds)}
          </h1>
          <Activity
            mode={
              isPlayer() || total > TIMING.FORTY_FIVE_SECONDS
                ? "hidden"
                : "visible"
            }
          >
            <button onClick={onNewGameClick}>Start New Game?</button>
          </Activity>
        </>
      );
    }
  };
  return (
    <StyledMessage>
      <h1 className="large-message-headline">Paused</h1>
      <h2>Player Disconnected: Waiting...</h2>
      <Countdown
        key={String(Date.now())}
        date={Date.now() + TIMING.ONE_MINUTE}
        intervalDelay={0}
        precision={3}
        renderer={renderer}
        onComplete={onNewGameClick}
      />

      {/* <Activity mode={isPlayer() ? "hidden" : "visible"}>
        <button onClick={onNewGameClick}>Start New Game?</button>
      </Activity> */}
    </StyledMessage>
  );
};

export default PausedMessage;
