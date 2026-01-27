import { useContext, useRef, type FC } from "react";
import {
  DEFAULT_CONNECTION_LENGTH,
  DEFAULT_NUMBER_OF_PLAYERS,
  generateGame,
} from "../../../gameLogic";
import {
  StyledButton,
  StyledForm,
  StyledFormRow,
  StyledInput,
  StyledLabel,
  StyledNewGame,
  StyledNewGameSection,
  StyledQRContainer,
} from "./styled";
import AppContext from "../../../App.context";
import type { Game } from "../../../gameLogic/types";
import { QRCodeSVG } from "qrcode.react";

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
      <h1 className="large-message-headline">New game</h1>
      <StyledNewGameSection>
        <StyledQRContainer>
          <QRCodeSVG
            width={300}
            height={300}
            viewBox="0 0 25 25"
            value="http://192.168.0.159:5173/player"
          />
          <h2>use your phone as a controller</h2>
        </StyledQRContainer>
        <StyledForm>
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
        </StyledForm>
      </StyledNewGameSection>
    </StyledNewGame>
  );
};

export default NewGame;
