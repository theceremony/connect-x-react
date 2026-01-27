import { useContext, useEffect, useState, type FC } from "react";

import { StyledPlayer } from "./styled";
import AppContext from "../../../App.context";
import { type Player } from "../../../gameLogic/types";

const Player: FC = () => {
  const { socket } = useContext(AppContext);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  useEffect(() => {
    if (socket) {
      socket.on("game:player-joined-lobby", (val) => {
        if (socket.id == val.id) setPlayer(val);
      });
      socket.on("game:player-left-lobby", (val) => {
        val.forEach((v) => {
          if (v.id === socket.id) setPlayer(v);
        });
      });
    }
  }, []);
  return (
    <StyledPlayer>
      <h1>PLAYER</h1>
      {player && <div>id: {player.piece}</div>}
    </StyledPlayer>
  );
};

export default Player;
