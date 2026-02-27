import styled from "styled-components";

import bkg from "./assets/funbkg-scifi-anime.png";
import bkgBeach from "./assets/funbkg-scifi-anime-beach.png";

const backdrop = Math.random() > 0.4 ? bkg : bkgBeach;

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
