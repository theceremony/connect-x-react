import styled from "styled-components";
import { StyledModal } from "../../scaffold";
export const StyledMessage = styled(StyledModal)`
  display: flex;

  justify-content: flex-start;
  .confetti {
    width: 100vw;
    height: 100vh;
    border: 10px solid green;
  }
`;

export const StyledWinnerSticker = styled.img`
  width: 100%;
  max-width: 32vh;
  z-index: 100;
`;
