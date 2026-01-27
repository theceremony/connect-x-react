import { useEffect, useReducer, useState } from "react";

import { StyledApp } from "./App.styled";
import AppContext, { appReducer, initialState } from "./App.context";
import GameBoard from "./components/game/GameBoard";
import { socket } from "./netCode/socket";
import GameStateDisplay from "./components/game/GameStateDisplay";
import NewGame from "./components/setup/NewGame";
import Message from "./components/feedback/Message";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  console.log(isConnected);
  return (
    <AppContext.Provider value={{ state, dispatch, socket }}>
      <StyledApp>
        {state.currentGame === undefined && <NewGame />}
        {state.currentGame?.winner && <Message />}

        {state.currentGame && !state.currentGame?.winner && (
          <GameStateDisplay />
        )}
        {state.currentGame && <GameBoard />}
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
