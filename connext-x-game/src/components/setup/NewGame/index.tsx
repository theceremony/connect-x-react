import { QRCodeSVG } from "qrcode.react";
import { useContext, useEffect, useRef, type FC } from "react";
import AppContext from "../../../App.context";
import { DEFAULT_CONNECTION_LENGTH, generateGame } from "../../../gameLogic";
import type { Game } from "../../../gameLogic/types";
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

const ROOM = "room1";

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
      socket.emit("fg:request-connection", { room: ROOM });

      socket.on("tg:approve-connection", (data) => {
        console.log(data);
      });
    }
    // if (socket) {
    //   const onPlayerConnect = (val: PlayerSocketEvent) => {
    //     console.log("player connected", val);
    //     const newPlayer = {
    //       id: val.id,
    //       piece: PLAYER_COLORS[state.lobby.length],
    //     } as Player;

    //     if (dispatch)
    //       dispatch([
    //         "lobby",
    //         [
    //           ...state.lobby,
    //           {
    //             ...newPlayer,
    //           } as Player,
    //         ],
    //       ]);
    //     console.log({ newPlayer });
    //     socket.emit("game:player-joined-lobby", newPlayer);
    //   };
    //   const onPlayerDisconnect = (val: PlayerSocketEvent) => {
    //     console.log("player disconnect", val);
    //     const newLobby = [...state.lobby]
    //       .filter((v) => {
    //         return val.id !== v.id;
    //       })
    //       .map((v, i) => ({ ...v, piece: PLAYER_COLORS[i] }));
    //     if (dispatch) dispatch(["lobby", newLobby]);
    //     socket.emit("game:player-left-lobby", newLobby);
    //   };
    //   socket.on(
    //     "game:connected",
    //     (val: { id: string; clients: { id: string; path: string }[] }) => {
    //       const newLobby = val.clients
    //         .filter((v) => v.path === "/player")
    //         .map((v, i) => ({
    //           id: v.id,
    //           piece: PLAYER_COLORS[i],
    //         })) as Lobby;
    //       if (dispatch) dispatch(["lobby", newLobby]);
    //     },
    //   );
    //   socket.on("player:connected", onPlayerConnect);
    //   socket.on("player:disconnect", onPlayerDisconnect);

    //   return () => {
    //     socket.off("player:connected", onPlayerConnect);
    //     socket.off("player:disconnect", onPlayerDisconnect);
    //   };
    // }
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
