import { useContext, useEffect, useRef, type FC } from "react";
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
import type { PlayerSocketEvent } from "../../../netCode/types";

const NewGame: FC = () => {
  const { state, dispatch, socket } = useContext(AppContext);

  const numConnectInput = useRef<HTMLInputElement>(null);

  const onStart = () => {
    const conLen =
      Number(numConnectInput.current?.value) || DEFAULT_CONNECTION_LENGTH;
    const numPlayer = state.lobby.length;

    if (dispatch)
      dispatch(["currentGame", generateGame(conLen)(numPlayer) as Game]);
  };

  useEffect(() => {
    if (socket) {
      const onPlayerConnect = (val: PlayerSocketEvent) => {
        console.log("player connected", val);
        if (dispatch) dispatch(["lobby", [...state.lobby, { id: val.id }]]);
      };
      const onPlayerDisconnect = (val: PlayerSocketEvent) => {
        console.log("player disconnect", val);
        if (dispatch)
          dispatch([
            "lobby",
            [...state.lobby].filter((v) => {
              return val.id !== v.id;
            }),
          ]);
      };

      socket.on("player:connected", onPlayerConnect);
      socket.on("player:disconnect", onPlayerDisconnect);

      return () => {
        socket.off("player:connected", onPlayerConnect);
        socket.off("player:disconnect", onPlayerDisconnect);
      };
    }
  }, [dispatch, socket, state.lobby]);

  return (
    <StyledNewGame>
      <h1 className="large-message-headline">New game</h1>
      <StyledNewGameSection>
        <StyledQRContainer>
          <QRCodeSVG
            width={300}
            height={300}
            viewBox="0 0 25 25"
            value={`${window.location.href}player`}
          />
          <h3>use your phone as a controller</h3>
        </StyledQRContainer>
        <StyledForm>
          <div>socket players: {state.lobby.length}</div>
          {/* <StyledFormRow>
            <StyledLabel>Players:</StyledLabel>
            <StyledInput
              type="number"
              ref={numPlayersInput}
              min={DEFAULT_NUMBER_OF_PLAYERS}
              max={4}
              defaultValue={DEFAULT_NUMBER_OF_PLAYERS}
            />
          </StyledFormRow> */}
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
