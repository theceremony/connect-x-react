import AppContext from "@/App.context";
import { StyledSlot } from "@/components/scaffold";
import type { Player } from "@/gameLogic/types";
import { ROOM } from "@/netCode/config";
import {
  type FC,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { StyledPlayer } from "./styled";

const PlayerRemote: FC = () => {
  const { socket } = useContext(AppContext);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [inGame] = useState(false);
  const onApproveConnection = useEffectEvent(
    ({ player }: { room: string; player: Player }): void => {
      if (socket?.id === player.id) setPlayer(player);
    },
  );
  useEffect(() => {
    if (!player) socket?.emit("fp:request-connection", { room: ROOM });
    socket?.on("tp:approve-connection", onApproveConnection);

    return () => {
      socket?.removeListener("tp:approve-connection", onApproveConnection);
      socket?.removeAllListeners();
    };
  }, [socket]);
  return (
    <StyledPlayer>
      <h1>PLAYER</h1>
      {!inGame && <div>waiting for game to start</div>}
      {player && (
        <div>
          <StyledSlot data-slot-color={player.piece}></StyledSlot>
          {player.piece}
        </div>
      )}
    </StyledPlayer>
  );
};

export default PlayerRemote;
