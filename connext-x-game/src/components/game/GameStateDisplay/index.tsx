import AppContext from "@/App.context";
import { StyledSlot } from "@/components/scaffold";
import { type FC, useContext } from "react";
import { StyledGameInterface } from "./styled";

const GameStateDisplay: FC = () => {
  const { state } = useContext(AppContext);
  return (
    <StyledGameInterface>
      <h1>current player</h1>
      <StyledSlot
        data-slot-color={state.currentPiece}
        className={`current-player slot ${state.currentPiece}`}
      ></StyledSlot>
      <h2>connect {state.currentGame?.connectLength} to win</h2>
      <h2>number of players {state.currentGame?.numberOfPlayers}</h2>
    </StyledGameInterface>
  );
};

export default GameStateDisplay;
