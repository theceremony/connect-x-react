import AppContext from "@/App.context";
import { type FC, useContext } from "react";
import { StyledGameInterface } from "./styled";
// -----------------------------------------------------------------------------
const GameStateDisplay: FC = () => {
  const { state } = useContext(AppContext);
  return (
    <StyledGameInterface>
      <h1>
        Connect <span className="">{state.currentGame?.connectLength}</span> to
        win
      </h1>
      <h2>
        number of players{" "}
        <span className="">{state.currentGame?.players?.length}</span>
      </h2>
    </StyledGameInterface>
  );
};
// -----------------------------------------------------------------------------
export default GameStateDisplay;
