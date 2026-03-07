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
  completed: boolean;
};

const PausedMessage: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const isPlayer = () => state.gameMode === "player";

  const onNewGameClick = () => {
    if (state.currentGame && dispatch) {
      dispatch(["previousGames", [...state.previousGames, state.currentGame]]);
      dispatch(["currentGame", undefined]);
    }
  };
  const renderer = ({ hours, minutes, seconds, completed }: RenderParams) => {
    if (completed) {
      // Render a complete state
      return <h1>Player timed out, restarting</h1>;
    } else {
      // Render a countdown
      return (
        <>
          <h2>Will auto-restart in: </h2>
          <h1 className="number">
            {hours}:{minutes}:{seconds}
          </h1>
        </>
      );
    }
  };
  return (
    <StyledMessage>
      <h1 className="large-message-headline">Paused</h1>
      <h2>Player Disconnected: Waiting...</h2>
      <Countdown
        date={Date.now() + TIMING.ONE_MINUTE}
        intervalDelay={0}
        precision={3}
        renderer={renderer}
        onComplete={onNewGameClick}
      />

      <Activity mode={isPlayer() ? "hidden" : "visible"}>
        <button onClick={onNewGameClick}>Start New Game?</button>
      </Activity>
    </StyledMessage>
  );
};

export default PausedMessage;
