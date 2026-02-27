/* eslint-disable react-hooks/set-state-in-effect */
import type { Game, Player, PlayerAction } from "@/gameLogic/types";
import { socket } from "@/netCode/socket";
import type {
  GameStatusSocketData,
  PlayerStatusSocketData,
} from "@/netCode/types";
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
import { getRoomFromURL } from "@/utils";
// export const getCenterColumn = (gameBoard: Board) =>
//   Math.floor(gameBoard.length / 2);

const PlayerRemote: FC = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [game, setGame] = useState<Game | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();

  const room = getRoomFromURL();

  const onApproveConnection = useEffectEvent(
    ({ player }: { room: string; player: Player }): void => {
      if (socket.id === player.id) setPlayer(player);
    },
  );

  const onGameStatusUpdate = useEffectEvent(
    ({ gameStatus }: GameStatusSocketData) => {
      // setInGame(!!(gameStatus.players && gameStatus.players.length > 1));

      console.log(gameStatus);
      setGame(gameStatus);
    },
  );

  const onPlayerStatusRequest = useEffectEvent(() => {
    socket.emit("fp:report-player-status", {
      id: socket.id,
      room,
      player,
    } as PlayerStatusSocketData);
  });

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

  useEffect(() => {
    if (game && game.players && game.currentPlayerIndex)
      setCurrentPlayer(game?.players[game.currentPlayerIndex]);

    if (game && game.players && !game.currentPlayerIndex)
      setCurrentPlayer(game?.players[0]);
  }, [game]);

  const onTap = (action: PlayerAction) => {
    console.log(action);
    if (socket && player)
      socket.emit("fp:player-action", {
        id: socket.id || "",
        room,
        player,
        action: action,
      });
  };

  const isCurrentPlayer = () =>
    currentPlayer && currentPlayer.piece === player?.piece ? true : false;

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
