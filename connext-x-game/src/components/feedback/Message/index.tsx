import { useContext, type FC } from "react";

import { StyledMessage } from "./styled";
import AppContext from "../../../App.context";

const Message: FC = () => {
  const { state, dispatch } = useContext(AppContext);
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
      <button onClick={onNewGameClick}>New Game</button>
    </StyledMessage>
  );
};

export default Message;
