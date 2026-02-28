import { lazy, Suspense, useReducer, useState } from "react";
import AppContext from "./App.context";
import { appReducer, initialState } from "./App.reducer";
import { StyledApp } from "./App.styled";
import logo from "./assets/logo.png";
//------------------------------------------------------------------------------
const GameController = lazy(() => import("@/components/game/GameController"));
const PlayerRemote = lazy(() => import("@/components/game/PlayerRemote"));
//------------------------------------------------------------------------------
import { preload } from "react-dom";
import { useInterval } from "react-use";
import { BACKGROUNDS } from "./App.config";
import SuspenseImage from "./components/scaffold/SuspenseImage";
//------------------------------------------------------------------------------
const randomBackground = (arr: typeof BACKGROUNDS) =>
  arr[Math.floor(Math.random() * arr.length)];
//------------------------------------------------------------------------------
function App() {
  BACKGROUNDS.map((a) => {
    preload(a, { as: "image" });
  });

  const initialBackdrop = randomBackground(BACKGROUNDS);

  const [backdrop, setBackDrop] = useState<string>(initialBackdrop);
  const [state, dispatch] = useReducer(appReducer, initialState);

  useInterval(() => {
    const newBackground = randomBackground(BACKGROUNDS);
    preload(newBackground, { as: "image" });
    setBackDrop(newBackground);
  }, 10000);

  const path = window.location.pathname;
  if (path.includes("/player"))
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <StyledApp data-is-player={true}>
          <Suspense
            fallback={
              <div className="loader">
                <h1>loading...</h1>
              </div>
            }
          >
            <PlayerRemote />
          </Suspense>
        </StyledApp>
      </AppContext.Provider>
    );
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledApp $backdrop={backdrop}>
        <GameController />
        {/* <StyledLogo src={logo} /> */}
        <SuspenseImage src={initialBackdrop} alt="backdrop" noTag={true} />
        <SuspenseImage
          className="logo"
          src={logo}
          alt="Connext a game I made to prove a point"
        />
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
