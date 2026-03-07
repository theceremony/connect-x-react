import { URL_PARAMS } from "@/App.config";
import AppContext from "@/App.context";
import {
  DEFAULT_CONNECTION_LENGTH,
  generateGame,
  PLAYER_COLORS,
} from "@/gameLogic";
import type { Game, Player } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import {
  Activity,
  type FC,
  useContext,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";
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
// -----------------------------------------------------------------------------
const NewGame: FC = () => {
  // ===========================================================================
  const { state, dispatch } = useContext(AppContext);
  // ===========================================================================
  const numConnectInput = useRef<HTMLInputElement>(null);
  // ===========================================================================
  const isPlayer = () => state.gameMode === "player";
  const onStart = () => {
    const conLen =
      Number(numConnectInput.current?.value) || DEFAULT_CONNECTION_LENGTH;
    dispatch(["currentGame", generateGame(conLen)([...state.lobby]) as Game]);
  };
  // ===========================================================================
  const onReqConn = useEffectEvent(
    ({ playerId }: { room: string; playerId: string }) => {
      if (state.lobby.length < PLAYER_COLORS.length) {
        const player =
          state.lobby.filter(({ id }) => id === playerId)[0] ||
          ({
            id: playerId,
            piece: PLAYER_COLORS.filter(
              (color) => !state.lobby.map(({ piece }) => piece).includes(color),
            )[0],
          } as Player);
        console.log("player connect", playerId);
        dispatch([
          "lobby",
          [
            ...state.lobby,
            {
              ...player,
            } as Player,
          ],
        ]);
      }
    },
  );

  // ===========================================================================
  const onDisconnect = useEffectEvent(({ id }: { id: string }) => {
    dispatch([
      "lobby",
      [...state.lobby].filter((v) => {
        return id !== v.id;
      }),
    ]);
  });
  // ===========================================================================
  //Socket Effect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    if (socket) {
      // -----------------------------------------------------------------------
      socket.emit("fg:request-connection", { room: state.room });
      // -----------------------------------------------------------------------
      socket.on("tg:request-player-connection", onReqConn);

      // -----------------------------------------------------------------------
      socket.on("tg:disconnect", onDisconnect);
    }
    // -------------------------------------------------------------------------
    return () => {
      if (socket) {
        socket.removeListener("tg:request-player-connection", onReqConn);
        socket.removeListener("tg:disconnect", onDisconnect);
      }
    };
  }, []);
  // ===========================================================================
  const getPlayerURL = () => {
    const newUrl = new URL(`${window.location.href}`);
    newUrl.searchParams.set(URL_PARAMS.ROOM, state.room);
    newUrl.searchParams.set(URL_PARAMS.MASTER_ID, state.masterId);
    newUrl.searchParams.set(URL_PARAMS.GAME_MODE, "controller");
    return newUrl.href;
  };
  // ===========================================================================
  const getNumPlayersLobby = () => state.lobby.length ?? 0;
  const testLobbyLen = (min = 1) => getNumPlayersLobby() > min;
  // ===========================================================================
  const url = new URL(getPlayerURL());

  // ===========================================================================
  return (
    <StyledNewGame
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.5 }}
      key="new-game-key"
    >
      <motion.h1
        className="large-message-headline"
        initial={{ opacity: 0, y: -150, scale: 5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "backOut", delay: 0.3 }}
        key="h1-key"
      >
        {isPlayer() ? "Join Game" : "New Game"}
      </motion.h1>
      <StyledNewGameSection
        initial={{ opacity: 0, y: 200, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "backOut", delay: 0.3 }}
        key="new-game-key"
      >
        <StyledQRContainer layout>
          <QRCodeSVG
            size={256}
            value={url.href}
            marginSize={1}
            onClick={() => window.open(url.href, "_blank")}
          />
          <h2>use your phone as a controller</h2>
        </StyledQRContainer>
        <StyledForm layout>
          <StyledFormRow layout>
            <h2>Players:</h2>
            <h1 className="number">{getNumPlayersLobby()}</h1>
          </StyledFormRow>

          <Activity mode={getNumPlayersLobby() > 0 ? "visible" : "hidden"}>
            <StyledFormRow layout>
              {state.lobby.map((v, i) => (
                <>
                  <h3 key={`player:${v.id}`}>Player {i + 1}:</h3>
                  <h2>{v.piece}</h2>
                </>
              ))}
            </StyledFormRow>
          </Activity>
          <Activity mode={isPlayer() ? "hidden" : "visible"}>
            <StyledFormRow>
              <StyledLabel>Connect:</StyledLabel>
              <StyledInput
                type="number"
                ref={numConnectInput}
                min={DEFAULT_CONNECTION_LENGTH - 1}
                max={10}
                defaultValue={DEFAULT_CONNECTION_LENGTH}
                className="number"
              />
            </StyledFormRow>
          </Activity>
          <Activity mode={isPlayer() ? "hidden" : "visible"}>
            <StyledFormRow data-full-span={true}>
              <Activity mode={testLobbyLen() ? "visible" : "hidden"}>
                <StyledButton onClick={onStart}>Start</StyledButton>
              </Activity>
              <Activity mode={testLobbyLen() ? "hidden" : "visible"}>
                <StyledButton disabled={true}>Waiting...</StyledButton>
              </Activity>
            </StyledFormRow>
          </Activity>
          <div>
            <i>At least 2 players required</i>
          </div>
        </StyledForm>
      </StyledNewGameSection>
    </StyledNewGame>
  );
};
// -----------------------------------------------------------------------------
export default NewGame;
