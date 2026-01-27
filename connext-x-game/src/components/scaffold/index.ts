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
  box-shadow:
    inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
    inset -15px -5px 0px 0px white;
  border-radius: 100%;
  /* border: 6px solid black; */
  background-color: rgb(50, 50, 50);
  &[data-slot-color="blue"] {
    background-color: blue;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
  }
  &[data-slot-color="red"] {
    background-color: red;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
  }
  &[data-slot-color="yellow"] {
    background-color: yellow;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
  }
  &[data-slot-color="green"] {
    background-color: green;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
  }

  &[data-slot-winner="true"] {
    border: 6px solid black;
    box-shadow: 0px 0px 20px 5px grey;
  }
`;
