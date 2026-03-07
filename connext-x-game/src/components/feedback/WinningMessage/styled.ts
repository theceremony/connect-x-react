import styled from "styled-components";
import { StyledModal } from "../../scaffold";
export const StyledMessage = styled(StyledModal)`
  display: flex;

  justify-content: flex-start;
  .confetti {
    width: 100vw;
    height: 100vh;
    /* scale: 10; */
    transform: translateY(0%);
  }
`;

export const StyledWinnerSticker = styled.img`
  width: 100%;
  max-width: 32vh;
  z-index: 100;
`;
