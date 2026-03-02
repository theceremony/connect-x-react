/* eslint-disable react-hooks/set-state-in-effect */
import type { Game, Player, PlayerAction } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import type {
  GameStatusSocketData,
  PlayerStatusSocketData,
} from "@/netCode/types";
import { getRoomFromURL } from "@/utils";
import { Activity, type FC, useEffect, useEffectEvent, useState } from "react";
import {
  StyledButtonContainer,
  StyledDirectionButton,
  StyledPlayer,
  StyledPlayerName,
  StyledPlayerPiece,
  StyledSlotContainer,
  StyledTurnBlocker,
} from "./styled";

const PlayerRemote: FC = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [game, setGame] = useState<Game | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();
  //----------------------------------------------------------------------------
  const room = getRoomFromURL();
  //----------------------------------------------------------------------------
  const onApproveConnection = useEffectEvent(
    ({ player }: { room: string; player: Player }): void => {
      if (socket.id === player.id) setPlayer(player);
    },
  );
  //----------------------------------------------------------------------------
  const getPlayerById = (id: string, players: Player[]) =>
    players.filter((v) => v.id === id)[0];
  //----------------------------------------------------------------------------
  const onGameStatusUpdate = useEffectEvent(
    ({ gameStatus }: GameStatusSocketData) => {
      if (player?.id && gameStatus?.players) {
        const updatedPlayer = getPlayerById(player.id, gameStatus.players);
        setPlayer(updatedPlayer);
      }
      console.log(gameStatus);
      setGame(gameStatus);
    },
  );
  //----------------------------------------------------------------------------
  const onPlayerStatusRequest = useEffectEvent(() => {
    socket.emit("fp:report-player-status", {
      id: socket.id,
      room,
      player,
    } as PlayerStatusSocketData);
  });
  //----------------------------------------------------------------------------
  useEffect(() => {
    if (!player && socket) socket.emit("fp:request-connection", { room });
    socket.on("tp:approve-connection", onApproveConnection);
    socket.on("tap:game-status-update", onGameStatusUpdate);
    socket.on("tap:request-player-status", onPlayerStatusRequest);

    return () => {
      socket.removeListener("tp:approve-connection", onApproveConnection);
      socket.removeListener("tap:game-status-update", onGameStatusUpdate);
      socket.removeListener("tap:request-player-status", onPlayerStatusRequest);
      socket.removeAllListeners();
    };
  }, [player, room]);
  //----------------------------------------------------------------------------
  useEffect(() => {
    if (game && game.players && game.currentPlayerIndex)
      setCurrentPlayer(game?.players[game.currentPlayerIndex]);

    if (game && game.players && !game.currentPlayerIndex)
      setCurrentPlayer(game?.players[0]);
  }, [game]);

  const onTap = (action: PlayerAction) => {
    if (socket && player)
      socket.emit("fp:player-action", {
        id: socket.id || "",
        room,
        player,
        action: action,
      });
  };
  //----------------------------------------------------------------------------
  const isCurrentPlayer = () =>
    currentPlayer && currentPlayer.piece === player?.piece ? true : false;
  //----------------------------------------------------------------------------
  return (
    <StyledPlayer>
      {player && (
        <>
          <Activity mode={game ? "hidden" : "visible"}>
            <StyledPlayerName>{player.piece} PLAYER</StyledPlayerName>{" "}
          </Activity>
          <Activity mode={game ? "visible" : "hidden"}>
            <Activity mode={isCurrentPlayer() ? "hidden" : "visible"}>
              <StyledTurnBlocker>
                <h1>Wait your turn</h1>
              </StyledTurnBlocker>
            </Activity>{" "}
          </Activity>
          <StyledSlotContainer>
            <StyledPlayerPiece
              data-slot-color={player.piece}
              onClick={() => onTap("drop")}
            >
              <Activity mode={game ? "visible" : "hidden"}> DROP</Activity>
            </StyledPlayerPiece>
          </StyledSlotContainer>
          <Activity mode={game ? "hidden" : "visible"}>
            <h3>waiting for game to start</h3>
          </Activity>
          <Activity mode={game ? "visible" : "hidden"}>
            <StyledButtonContainer>
              <StyledDirectionButton onClick={() => onTap("move-left")}>
                left
              </StyledDirectionButton>
              <StyledDirectionButton onClick={() => onTap("move-right")}>
                right
              </StyledDirectionButton>
            </StyledButtonContainer>
          </Activity>
        </>
      )}
    </StyledPlayer>
  );
};

export default PlayerRemote;
