import { useContext, useRef, type FC } from "react";
import {
  DEFAULT_CONNECTION_LENGTH,
  DEFAULT_NUMBER_OF_PLAYERS,
  generateGame,
} from "../../../gameLogic";
import {
  StyledButton,
  StyledFormRow,
  StyledInput,
  StyledLabel,
  StyledNewGame,
} from "./styled";
import AppContext from "../../../App.context";
import type { Game } from "../../../gameLogic/types";

const NewGame: FC = () => {
  const { dispatch } = useContext(AppContext);
  const numPlayersInput = useRef<HTMLInputElement>(null);
  const numConnectInput = useRef<HTMLInputElement>(null);
  const onStart = () => {
    const conLen =
      Number(numConnectInput.current?.value) || DEFAULT_CONNECTION_LENGTH;
    const numPlayer =
      Number(numPlayersInput.current?.value) || DEFAULT_NUMBER_OF_PLAYERS;

    if (dispatch)
      dispatch(["currentGame", generateGame(conLen)(numPlayer) as Game]);
  };
  return (
    <StyledNewGame>
      <h1>New game</h1>

      <StyledFormRow>
        <StyledLabel>Players:</StyledLabel>
        <StyledInput
          type="number"
          ref={numPlayersInput}
          min={DEFAULT_NUMBER_OF_PLAYERS}
          max={4}
          defaultValue={DEFAULT_NUMBER_OF_PLAYERS}
        />
      </StyledFormRow>
      <StyledFormRow>
        <StyledLabel>Connect:</StyledLabel>
        <StyledInput
          type="number"
          ref={numConnectInput}
          min={DEFAULT_CONNECTION_LENGTH}
          max={10}
          defaultValue={DEFAULT_CONNECTION_LENGTH}
        />
      </StyledFormRow>
      <div>
        <StyledButton onClick={onStart}>Start</StyledButton>
      </div>
    </StyledNewGame>
  );
};

export default NewGame;
