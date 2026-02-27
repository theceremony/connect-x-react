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
  background-color: white;
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
