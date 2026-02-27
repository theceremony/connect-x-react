import { lazy, Suspense, useReducer, useState } from "react";
import AppContext from "./App.context";
import { appReducer, initialState } from "./App.reducer";
import { StyledApp, StyledLogo } from "./App.styled";
import logo from "./assets/logo.png";
//------------------------------------------------------------------------------
const GameController = lazy(() => import("@/components/game/GameController"));
const PlayerRemote = lazy(() => import("@/components/game/PlayerRemote"));
//------------------------------------------------------------------------------
import { preload } from "react-dom";
import { useInterval } from "react-use";
import { BACKGROUNDS } from "./App.config";
//------------------------------------------------------------------------------
const randomBackground = (arr: typeof BACKGROUNDS) =>
  arr[Math.floor(Math.random() * arr.length)];
//------------------------------------------------------------------------------
function App() {
  BACKGROUNDS.map((a) => {
    preload(a, { as: "image" });
  });

  const [backdrop, setBackDrop] = useState<string>(
    randomBackground(BACKGROUNDS),
  );
  const [state, dispatch] = useReducer(appReducer, initialState);

  useInterval(() => {
    const newBackground = randomBackground(BACKGROUNDS);
    preload(newBackground, { as: "image" });
    setBackDrop(newBackground);
  }, 60000);

  const path = window.location.pathname;
  if (path === "/player")
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <StyledApp data-is-player={true}>
          <Suspense>
            <PlayerRemote />
          </Suspense>
        </StyledApp>
      </AppContext.Provider>
    );
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledApp $backdrop={backdrop}>
        <GameController />
        <StyledLogo src={logo} />
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
