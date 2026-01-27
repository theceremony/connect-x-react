import type { FC } from "react";
import {
  DEFAULT_CONNECTION_LENGTH,
  DEFAULT_NUMBER_OF_PLAYERS,
} from "../../../gameLogic";
import { StyledNewGame } from "./styled";

const NewGame: FC = () => {
  return (
    <StyledNewGame>
      <h1>New game</h1>

      <div>
        <label>Number of players:</label>
        <input
          name="numberOfPLayers"
          type="number"
          min={DEFAULT_NUMBER_OF_PLAYERS}
          defaultValue={DEFAULT_NUMBER_OF_PLAYERS}
        />
      </div>
      <div>
        <label>Connect how many?:</label>
        <input
          name="numberOfPLayers"
          type="number"
          min={DEFAULT_CONNECTION_LENGTH}
          defaultValue={DEFAULT_CONNECTION_LENGTH}
        />
      </div>
      <div>
        <button>Start</button>
      </div>
    </StyledNewGame>
  );
};

export default NewGame;
