import type { Player } from "@/gameLogic/types";
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
  useEffect(() => {
    if (!player) socket?.emit("fp:request-connection", { room: ROOM });
    socket?.on("tp:approve-connection", onApproveConnection);
    socket.on("tap:game-status-update", (data) => {
      if (data.gameStatus.players && data.gameStatus.players.length > 1)
        setInGame(true);
    });
    return () => {
      socket?.removeListener("tp:approve-connection", onApproveConnection);
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
