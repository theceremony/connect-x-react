import { lazy, Suspense, useReducer } from "react";
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
import { BACKGROUNDS, TIMING } from "./App.config";
import AnimatedLoader from "./components/scaffold/AnimatedLoader";
import SuspenseImage from "./components/scaffold/SuspenseImage";
import { getRandomArrayValue } from "./utils";
//------------------------------------------------------------------------------
function App() {
  BACKGROUNDS.map((a) => {
    preload(a, { as: "image" });
  });
  //----------------------------------------------------------------------------
  const [state, dispatch] = useReducer(appReducer, initialState);
  //----------------------------------------------------------------------------
  useInterval(() => {
    const newBackground = getRandomArrayValue<string>(BACKGROUNDS);
    preload(newBackground, { as: "image" });
    dispatch([
      "theme",
      {
        currentBackground: getRandomArrayValue<string>(BACKGROUNDS),
      },
    ]);
  }, TIMING.TEN_MINUTES);
  //----------------------------------------------------------------------------
  if (state.gameMode === "controller")
    return (
      <Suspense fallback={<AnimatedLoader />}>
        <AppContext.Provider value={{ state, dispatch }}>
          <StyledApp data-is-player={true}>
            <PlayerRemote />
          </StyledApp>
        </AppContext.Provider>
      </Suspense>
    );
  //----------------------------------------------------------------------------
  return (
    <Suspense fallback={<AnimatedLoader />}>
      <AppContext.Provider value={{ state, dispatch }}>
        <StyledApp $backdrop={state.theme.currentBackground}>
          <GameController />
          <SuspenseImage
            src={initialState.theme.currentBackground}
            alt="backdrop"
            noTag={true}
          />
          <SuspenseImage
            className="logo"
            src={logo}
            alt="Connext a game I made to prove a point"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key="logo-key"
          />
        </StyledApp>
      </AppContext.Provider>
    </Suspense>
  );
}
//------------------------------------------------------------------------------
export default App;
