import styled from "styled-components";

export const StyledModal = styled.div`
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
  &[data-slot-color="yellow"] {
    background-color: yellow;
  }
  &[data-slot-color="green"] {
    background-color: green;
  }
`;
