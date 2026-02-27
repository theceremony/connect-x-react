import styled from "styled-components";

import bkg from "./assets/funbkg-scifi-anime.png";

export const StyledApp = styled.div`
  display: flex;
  /* flex-direction: column; */
  background: url(${bkg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100vw;
  height: 100dvh;
  border: 10px solid rgba(255, 255, 255, 1);
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
