import { useContext, useRef, type FC } from "react";
import {
  DEFAULT_CONNECTION_LENGTH,
  DEFAULT_NUMBER_OF_PLAYERS,
  generateGame,
} from "../../../gameLogic";
import { StyledNewGame } from "./styled";
import AppContext from "../../../App.context";
import type { Game } from "../../../gameLogic/types";

const NewGame: FC = () => {
  const { dispatch } = useContext(AppContext);
  const numPlayersInput = useRef<HTMLInputElement>(null);
  const numConnectInput = useRef<HTMLInputElement>(null);
  const onStart = () => {
    const conLen =
      Number(numConnectInput.current?.value) || DEFAULT_CONNECTION_LENGTH;
    const numPlayer =
      Number(numPlayersInput.current?.value) || DEFAULT_NUMBER_OF_PLAYERS;

    if (dispatch)
      dispatch(["currentGame", generateGame(conLen)(numPlayer) as Game]);
  };
  return (
    <StyledNewGame>
      <h1>New game</h1>

      <div>
        <label>Number of players:</label>
        <input
          type="number"
          ref={numPlayersInput}
          min={DEFAULT_NUMBER_OF_PLAYERS}
          defaultValue={DEFAULT_NUMBER_OF_PLAYERS}
        />
      </div>
      <div>
        <label>Connect how many?:</label>
        <input
          type="number"
          ref={numConnectInput}
          min={DEFAULT_CONNECTION_LENGTH}
          defaultValue={DEFAULT_CONNECTION_LENGTH}
        />
      </div>
      <div>
        <button onClick={onStart}>Start</button>
      </div>
    </StyledNewGame>
  );
};

export default NewGame;
