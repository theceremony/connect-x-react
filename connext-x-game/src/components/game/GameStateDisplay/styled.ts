import styled from "styled-components";

export const StyledGameInterface = styled.div`
  /* border: 1px solid green; */
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 350px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 4px solid rgba(0, 100, 100, 1);
  backdrop-filter: blur(5px);
  box-shadow: inset 0px 0px 30px rgba(0, 100, 100, 1);
  box-shadow: 4px -4px 10px rgba(0, 0, 0, 0.5);
  color: black;
  border-radius: 30px;
  text-align: center;
  left: 40px;
  top: 40px;
  .current-player {
    max-width: 80px;
    max-height: 80px;
  }
`;
