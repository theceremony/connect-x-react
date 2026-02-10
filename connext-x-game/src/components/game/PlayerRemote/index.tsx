import type { Game, Player } from "@/gameLogic/types";
import { ROOM } from "@/netCode/config";
import { socket } from "@/netCode/socket";
import { type FC, useEffect, useEffectEvent, useState } from "react";
import {
  StyledPlayer,
  StyledPlayerName,
  StyledPlayerPiece,
  StyledSlotContainer,
} from "./styled";

const PlayerRemote: FC = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [inGame, setInGame] = useState(false);
  const onApproveConnection = useEffectEvent(
    ({ player }: { room: string; player: Player }): void => {
      if (socket?.id === player.id) setPlayer(player);
    },
  );

  const onGameStatusUpdate = useEffectEvent(
    ({ gameStatus }: { room: string; gameStatus: Game }) => {
      setInGame(!!(gameStatus.players && gameStatus.players.length > 1));
    },
  );

  useEffect(() => {
    if (!player) socket?.emit("fp:request-connection", { room: ROOM });
    socket.on("tp:approve-connection", onApproveConnection);
    socket.on("tap:game-status-update", onGameStatusUpdate);
    return () => {
      socket?.removeListener("tp:approve-connection", onApproveConnection);
      socket.removeListener("tap:game-status-update", onGameStatusUpdate);
      socket?.removeAllListeners();
    };
  }, []);
  return (
    <StyledPlayer>
      {player && (
        <>
          <StyledPlayerName>{player.piece} PLAYER</StyledPlayerName>

          <StyledSlotContainer>
            <h3></h3>
            <StyledPlayerPiece
              data-slot-color={player.piece}
            ></StyledPlayerPiece>
          </StyledSlotContainer>
          {!inGame && <div>waiting for game to start</div>}
        </>
      )}
    </StyledPlayer>
  );
};

export default PlayerRemote;
