import styled from "styled-components";

export const StyledGameInterface = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 30%;

  .current-player {
    max-width: 80px;
    max-height: 80px;
  }
`;
