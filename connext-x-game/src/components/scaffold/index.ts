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
  background-color: rgba(20, 20, 20, 0.8);
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  gap: 0.1vw;

  .large-message-headline {
    font-size: 12rem;
    text-transform: uppercase;

    color: transparent;
    background: linear-gradient(180deg, white, pink, hotpink);
    background-clip: text;
    text-shadow: 8px 8px 0px rgba(100, 0, 0, 0.2);
  }
`;

export const StyledSlot = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  box-shadow:
    inset 2px 6px 4px 5px rgba(0, 0, 0, 0.5),
    inset -10px -5px 0px 0px rgba(210, 190, 190, 1);

  border-radius: 100%;

  /* border: 6px solid black; */
  background-color: rgba(50, 50, 50, 0.5);

  &[data-slot-color="hidden"] {
    background-color: unset;
    box-shadow: unset;
  }
  &[data-slot-color="blue"] {
    background-color: blue;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    &[data-slot-border] {
      border-width: 4px;
      border-style: solid;
      box-shadow:
        inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
        inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    }
  }
  &[data-slot-color="red"] {
    background-color: red;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    &[data-slot-border] {
      border-width: 8px;
      border-style: solid;
      border-color: #7e2020;
      box-shadow:
        inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
        inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    }
  }
  &[data-slot-color="yellow"] {
    background-color: yellow;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    &[data-slot-border] {
      border-width: 8px;
      border-style: solid;
      border-color: #6e6e3a;
      box-shadow:
        inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
        inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    }
  }
  &[data-slot-color="green"] {
    background-color: green;
    box-shadow:
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.3),
      inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
      inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    &[data-slot-border] {
      border-width: 4px;
      border-style: solid;
      box-shadow:
        inset 15px 15px 2px 0px rgba(255, 255, 255, 0.1),
        inset -15px -15px 2px 0px rgba(0, 0, 0, 0.2);
    }
  }

  &[data-slot-winner="true"] {
    border: 6px solid black;
    box-shadow: 0px 0px 20px 5px grey;
  }
`;
