import { lazy, Suspense, useReducer } from "react";

import AppContext from "./App.context";
import { StyledApp, StyledLogo } from "./App.styled";

import { appReducer, initialState } from "./App.reducer";

const GameController = lazy(() => import("@/components/game/GameController"));

const PlayerRemote = lazy(() => import("@/components/game/PlayerRemote"));
import logo from "./assets/logo.png";
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
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
      <StyledApp>
        <GameController />
        <StyledLogo src={logo} />
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
