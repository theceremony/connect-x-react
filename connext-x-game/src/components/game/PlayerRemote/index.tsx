import { useContext, useEffect, useState, type FC } from "react";

import { StyledPlayer } from "./styled";
import AppContext from "../../../App.context";
import { type Player } from "../../../gameLogic/types";
import { StyledSlot } from "../../scaffold";

const PlayerRemote: FC = () => {
  const { socket } = useContext(AppContext);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [inGame, setInGame] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on("game:player-joined-lobby", (val: Player) => {
        if (socket.id == val.id) setPlayer(val);
      });
      socket.on("game:player-left-lobby", (val: Player[]) => {
        val.forEach((v) => {
          if (v.id === socket.id) setPlayer(v);
        });
      });
      socket.on("game:gameStart", () => {
        setInGame(true);
      });
    }
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
