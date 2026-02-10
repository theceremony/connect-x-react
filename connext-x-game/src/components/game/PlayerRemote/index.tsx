import type { Game, Player, PlayerAction } from "@/gameLogic/types";
import { ROOM } from "@/netCode/config";
import { socket } from "@/netCode/socket";
import type { GameStatusSocketData } from "@/netCode/types";
import { Activity, type FC, useEffect, useEffectEvent, useState } from "react";
import {
  StyledButtonContainer,
  StyledDirectionButton,
  StyledPlayer,
  StyledPlayerName,
  StyledPlayerPiece,
  StyledSlotContainer,
} from "./styled";
// export const getCenterColumn = (gameBoard: Board) =>
//   Math.floor(gameBoard.length / 2);

const PlayerRemote: FC = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [game, setGame] = useState<Game | undefined>();

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

  useEffect(() => {
    if (!player && socket) socket.emit("fp:request-connection", { room: ROOM });
    socket.on("tp:approve-connection", onApproveConnection);
    socket.on("tap:game-status-update", onGameStatusUpdate);

    return () => {
      socket.removeListener("tp:approve-connection", onApproveConnection);
      socket.removeListener("tap:game-status-update", onGameStatusUpdate);
      socket.removeAllListeners();
    };
  }, [player]);

  const onTap = (action: PlayerAction) => {
    console.log(action);
    if (socket && player)
      socket.emit("fp:player-action", {
        id: socket.id || "",
        room: ROOM,
        player,
        action: action,
      });
  };
  return (
    <StyledPlayer>
      {player && (
        <>
          <Activity mode={game ? "hidden" : "visible"}>
            {" "}
            <StyledPlayerName>{player.piece} PLAYER</StyledPlayerName>{" "}
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
