import { lazy, Suspense, useReducer, useState } from "react";

import AppContext from "./App.context";
import { StyledApp, StyledLogo } from "./App.styled";

import { appReducer, initialState } from "./App.reducer";
import logo from "./assets/logo.png";

const GameController = lazy(() => import("@/components/game/GameController"));

const PlayerRemote = lazy(() => import("@/components/game/PlayerRemote"));

import { preload } from "react-dom";
import { useInterval } from "react-use";
import bkg9 from "./assets/bkg-no-theme.png";
import bkg2 from "./assets/funbkg-scifi-anime-beach.png";
import bkg7 from "./assets/funbkg-scifi-anime-beach2.png";
import bkg4 from "./assets/funbkg-scifi-anime-cozy.png";
import bkg3 from "./assets/funbkg-scifi-anime-fantasy.png";
import bkg6 from "./assets/funbkg-scifi-anime-monster.png";
import bkg8 from "./assets/funbkg-scifi-anime-scifi2.png";
import bkg5 from "./assets/funbkg-scifi-anime-spooky.png";
import bkg1 from "./assets/funbkg-scifi-anime.png";

const randomValue = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const backgrounds = [bkg1, bkg2, bkg3, bkg4, bkg5, bkg6, bkg7, bkg8, bkg9];

function App() {
  backgrounds.map((a) => {
    preload(a, { as: "image" });
  });

  const [backdrop, setBackDrop] = useState<string>(randomValue(backgrounds));
  const [state, dispatch] = useReducer(appReducer, initialState);

  useInterval(() => {
    const newBackground = randomValue(backgrounds);
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
