import AppContext from "@/App.context";
import {
  DEFAULT_CONNECTION_LENGTH,
  generateGame,
  PLAYER_COLORS,
} from "@/gameLogic";
import type { Game, Player } from "@/gameLogic/types";
import { ROOM } from "@/netCode/config";
import { QRCodeSVG } from "qrcode.react";
import { type FC, useContext, useEffect, useRef } from "react";
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

const NewGame: FC = () => {
  const { state, dispatch, socket } = useContext(AppContext);

  const numConnectInput = useRef<HTMLInputElement>(null);

  const onStart = () => {
    const conLen =
      Number(numConnectInput.current?.value) || DEFAULT_CONNECTION_LENGTH;

    if (dispatch)
      dispatch(["currentGame", generateGame(conLen)([...state.lobby]) as Game]);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("fg:request-connection", { room: ROOM });

      socket.on("tg:approve-connection", (data) => {
        console.log("connection approved", data);
      });

      socket.on("tg:request-player-connection", ({ playerId }) => {
        const player = {
          id: playerId,
          piece: PLAYER_COLORS[state.lobby.length],
        } as Player;

        if (dispatch)
          dispatch([
            "lobby",
            [
              ...state.lobby,
              {
                ...player,
              } as Player,
            ],
          ]);
        console.log("tg:request-player-connection", player);
        socket.emit("fg:player-connection-approved", { room: ROOM, player });
      });

      socket.on("tg:disconnect", ({ id }) => {
        console.log("player disconnect", id);
        const newLobby = [...state.lobby]
          .filter((v) => {
            return id !== v.id;
          })
          .map((v, i) => ({ ...v, piece: PLAYER_COLORS[i] }));
        if (dispatch) dispatch(["lobby", newLobby]);
      });
    }
    return () => {
      if (socket) socket.removeAllListeners();
    };
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
            value={`http://${window.location.hostname}:${window.location.port}/player`}
          />
          <h3>use your phone as a controller</h3>
        </StyledQRContainer>
        <StyledForm>
          {state.lobby.map((v, i) => (
            <div>
              player {i + 1}: {v.piece}
            </div>
          ))}

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
