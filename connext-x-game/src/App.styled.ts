import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 100vw;
  height: 100vh;
  border: 10px solid grey;
  gap: 5px;
  h1,
  h2,
  h3,
  h4 {
    padding: 0;
    margin: 0;
    line-height: 1;
  }
`;

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

export const StyleMessage = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.9);
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  gap: 20px;
  .large-message-headline {
    font-size: 10rem;
    text-transform: uppercase;
  }
`;
