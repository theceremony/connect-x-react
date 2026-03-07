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

  const onNewGameClick = () => {
    if (state.currentGame && dispatch) {
      dispatch(["previousGames", [...state.previousGames, state.currentGame]]);
      dispatch(["currentGame", undefined]);
    }
  };
  return (
    <StyledMessage>
      <h1 className="large-message-headline">Winner!</h1>
      <h1>{state.currentGame?.winner}</h1>
      <StyledWinnerSticker
        src={state.currentGame?.winner === "red" ? winnerRed : winnerYellow}
      />
      <Activity mode={isPlayer() ? "hidden" : "visible"}>
        <button onClick={onNewGameClick}>New Game</button>
      </Activity>
      <Confetti
        width={width}
        height={height}
        colors={["#ff0000", "#ffef08", "#0000ff", "#00ff00"]}
      />
    </StyledMessage>
  );
};

export default WinningMessage;
