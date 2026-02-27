import AppContext from "@/App.context";

import { type FC, useContext } from "react";
import { StyledGameInterface } from "./styled";

const GameStateDisplay: FC = () => {
  const { state } = useContext(AppContext);
  return (
    <StyledGameInterface>
      <h1>connect {state.currentGame?.connectLength} to win</h1>
      <h2>number of players {state.currentGame?.players?.length}</h2>
    </StyledGameInterface>
  );
};

export default GameStateDisplay;
