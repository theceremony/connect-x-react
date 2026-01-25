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
`;

export const StyledBoard = styled.div`
  display: flex;
  width: 60%;
  border: 5px solid grey;
  background-color: white;
  border-radius: 40px;
  padding: 15px;
  /* gap:5px; */
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* border:2px solid black; */
  border-radius: 20px;
  gap: 5px;
  padding: 5px;
  width: 100%;
  &:hover {
    background-color: yellowgreen;
  }
`;

export const StyledSlot = styled.div`
  display: flex;

  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  border: 6px solid black;
  border-radius: 100%;
  background-color: black;
  &[data-slot-color="blue"] {
    background-color: blue;
  }
  &[data-slot-color="red"] {
    background-color: red;
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
  .message {
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
  }
  .winner {
    font-size: 10rem;
    text-transform: uppercase;
  }
`;
