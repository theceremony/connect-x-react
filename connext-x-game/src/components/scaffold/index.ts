import { motion } from "motion/react";
import styled from "styled-components";

export const StyledModal = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(20, 20, 20, 0.8);
  justify-content: flex-start;
  align-items: center;
  backdrop-filter: blur(3px);
  gap: 1vw;
  padding: 3vw;
  border: 10px solid white;
  border-radius: 30px;

  .large-message-headline {
    font-size: 12rem;
    text-transform: uppercase;

    color: transparent;
    background: linear-gradient(180deg, white, pink, hotpink);
    background-clip: text;
    text-shadow: 8px 8px 0px rgba(100, 0, 0, 0.2);
  }
`;

export const SimpleSlot = styled.div`
  position: relative;
  display: flex;
  /* border: 10px solid green; */
  width: 100%;
  height: auto;
  aspect-ratio: 1/0.8;
  border: 3px solid rgb(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: aquamarine;
  border-top-color: rgb(255, 255, 255, 0.7);
  border-left-color: rgb(255, 255, 255, 0.5);

  /* border-radius: 100%; */
  /* background-color: rgb(44, 115, 120); */
  margin: 2px;

  transition: background-color 200ms ease-in-out;

  &[data-slot-border] {
    margin: unset;
    aspect-ratio: 1/1;
    transform: scale(1.2);
  }

  &[data-column-selected="true"] {
    background-color: rgb(255, 255, 255, 0.7);
  }
  &[data-slot-color="hidden"] {
    background-color: unset;
    box-shadow: unset;
    border: unset;
  }
  &[data-slot-color="blue"] {
    background-color: blue;

    &[data-slot-border] {
      border-style: solid;
    }
  }
  &[data-slot-color="red"] {
    background-color: red;

    &[data-slot-border] {
      border-style: solid;
      border-color: #7e2020;
    }
  }
  &[data-slot-color="yellow"] {
    background-color: yellow;

    &[data-slot-border] {
      border-style: solid;
      border-color: #6e6e3a;
    }
  }
  &[data-slot-color="green"] {
    background-color: green;

    &[data-slot-border] {
      border-style: solid;
    }
  }

  &[data-slot-winner="true"] {
    border: 1px solid white;
    box-shadow: 0px 0px 20px 5px hotpink;
  }
`;

export const StyledSlot = styled(motion.div)`
  position: relative;
  display: flex;

  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  box-shadow:
    inset 2px 6px 4px 5px rgba(0, 0, 0, 0.5),
    inset -13px -8px 0px 0px rgb(14, 68, 148);

  border-radius: 100%;
  /* border: 6px solid black; */
  background-color: rgba(50, 50, 50, 0.5);
  transform: scale(1);

  &[data-slot-color="hidden"] {
    background-color: unset;
    box-shadow: unset;
    transform: scale(2);
  }
  &[data-slot-border] {
    transform: scale(1.2);
  }
  &[data-column-selected="true"] {
    border: 0.2vw solid rgb(255, 255, 255, 0.7);
    box-shadow:
      inset 0px 0px 0.3vw 0.3vw rgb(150, 255, 200, 0.5),
      inset 2px 6px 4px 5px rgba(0, 0, 0, 0.5),
      inset -13px -8px 0px 0px rgb(14, 68, 148);
    transition: box-shadow 50ms ease-in-out;
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
    border: 6px solid white;
    box-shadow: 0px 0px 20px 5px hotpink;
  }
`;
