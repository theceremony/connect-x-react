import { StyledSlot } from "@/components/scaffold";
import { motion } from "motion/react";
import styled from "styled-components";

export const StyledPlayer = styled(motion.div)`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  user-select: none;
  padding: 10vw;
  background-color: grey;
  width: 100%;
  overflow: hidden;
`;

export const StyledTurnBlocker = styled(motion.div)`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 5vw;
  text-align: center;
`;

export const StyledSlotContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50vh;
  /* border: 1px solid green; */
  gap: 10px;
  align-items: center;
`;

export const StyledPlayerPiece = styled(StyledSlot)`
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1vw solid rgba(255, 255, 255, 0.7);
  font-weight: 900;
  text-shadow: 1vw 1vw 0px rgba(0, 0, 0, 0.6);
  font-size: 15vw;
  background: radial-gradient(
    closest-side,
    rgba(255, 255, 255, 0) 00%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.6) 100%
  );
`;
export const StyledPlayerName = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;
export const StyledButtonContainer = styled(motion.div)`
  display: flex;

  width: 100%;
  gap: 5vw;
  /* max-width: 300px; */
  justify-content: center;
  align-items: center;
`;

export const StyledDirectionButton = styled(motion.button)`
  all: unset;
  width: 100%;
  border: 10px solid green;
`;

export const StyledPixelIcon = styled(motion.img)`
  width: 100%;
  /* aspect-ratio: 1/1; */
  image-rendering: pixelated;
  opacity: 1;

  /* mix-blend-mode: multiply; */
  &.flipped {
    transform: scaleX(-1);
  }
`;
