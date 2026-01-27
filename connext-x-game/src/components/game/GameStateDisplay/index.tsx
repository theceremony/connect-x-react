import { useContext, type FC } from "react";

import AppContext from "../../../App.context";

import { StyledSlot } from "../../scaffold";
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
    </StyledGameInterface>
  );
};

export default GameStateDisplay;
