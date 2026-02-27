import styled from "styled-components";

import bkg1 from "./assets/funbkg-scifi-anime.png";
import bkg2 from "./assets/funbkg-scifi-anime-beach.png";
import bkg3 from "./assets/funbkg-scifi-anime-fantasy.png";
import bkg4 from "./assets/funbkg-scifi-anime-cozy.png";
import bkg5 from "./assets/funbkg-scifi-anime-spooky.png";
import bkg6 from "./assets/funbkg-scifi-anime-monster.png";
import bkg7 from "./assets/funbkg-scifi-anime-beach2.png";
import bkg8 from "./assets/funbkg-scifi-anime-scifi2.png";
import bkg9 from "./assets/bkg-no-theme.png";

const randomValue = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const backgrounds = [bkg1, bkg2, bkg3, bkg4, bkg5, bkg6, bkg7, bkg8, bkg9];

const backdrop = randomValue(backgrounds);

export const StyledApp = styled.div`
  display: flex;
  /* flex-direction: column; */
  background: url(${backdrop});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  align-items: center;
  padding: 1vw;
  width: 100vw;
  height: 100dvh;
  border: 10px solid rgba(255, 255, 255, 1);
  border-radius: 1vw;
  overflow: hidden;
  gap: 5px;
  h1,
  h2,
  h3,
  h4 {
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  &[data-is-player] {
    background: unset;
  }
`;

export const StyledLogo = styled.img`
  position: fixed;
  z-index: 200;
  bottom: -40px;
  width: 100%;
  max-width: 600px;
`;
