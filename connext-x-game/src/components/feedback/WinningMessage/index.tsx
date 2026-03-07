import AppContext from "@/App.context";
import { Activity, type FC, useContext } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import winnerRed from "../../../assets/winner-red.png";
import winnerYellow from "../../../assets/winner-yellow.png";
import { StyledMessage, StyledWinnerSticker } from "./styled";

const WinningMessage: FC = () => {
  const { width, height } = useWindowSize();
  const { state, dispatch } = useContext(AppContext);
  const isPlayer = () => state.gameMode === "player";

  const confettiColors = {
    yellow: ["#ffef08", "#9e9402", "#fff896"],
    red: ["#ff0000", "#920000", "#ff7d7d", "#a43535"],
    blue: ["#0000ff", "#7a1b9a"],
    green: ["#00ff00", "#96ff5e", "#318d64"],
  };

  const onNewGameClick = () => {
    if (state.currentGame && dispatch) {
      dispatch(["previousGames", [...state.previousGames, state.currentGame]]);
      dispatch(["currentGame", undefined]);
    }
  };
  return (
    <StyledMessage
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
      key={`win-message-key-${state.currentGame?.winner}`}
    >
      <h1 className="large-message-headline">Winner!</h1>
      <h1>{state.currentGame?.winner}</h1>
      <StyledWinnerSticker
        src={state.currentGame?.winner === "red" ? winnerRed : winnerYellow}
      />
      <Activity mode={isPlayer() ? "hidden" : "visible"}>
        <button onClick={onNewGameClick}>New Game</button>
      </Activity>
      <Confetti
        numberOfPieces={100}
        className="confetti"
        width={width * 0.3}
        height={height * 0.3}
        colors={confettiColors[state.currentGame?.winner || "red"]}
      />
    </StyledMessage>
  );
};

export default WinningMessage;
