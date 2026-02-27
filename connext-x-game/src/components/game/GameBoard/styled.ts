import { motion } from "motion/react";
import styled from "styled-components";

export const StyledGameBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 60vw;
  max-width: 80vh;
  /* padding: 25vw; */
  justify-content: center;
  align-items: center;
  /* border: 10px solid green; */
`;

export const StyledGameBoard = styled(motion.div)`
  display: flex;

  width: 100%;
  backdrop-filter: blur(2px);
  border-radius: 2.5vw;
  /* padding: 15px; */
  border: 0.5vw solid rgb(72, 145, 255);
  /* gap:5px; */
  box-shadow: 8px 10px 0px 10px rgb(1, 37, 92);
  /* opacity: 0.9; */
  overflow: hidden;
`;

export const StyledSlotContainer = styled.div`
  position: relative;
  padding: 8%;
`;

export const StyledSlotBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  background-color: rgb(0, 104, 222);
  mask: radial-gradient(circle at center, transparent 50%, black 10%);
`;

export const StyledColumnSelectContainer = styled(motion.div)`
  display: flex;

  width: 100%;
  padding: 15px;
  /* border: 10px solid green; */
  padding-top: 0;
  /* margin-top: -15%; */
`;
export const StyledColumnSelect = styled(motion.div)`
  display: flex;
  padding: 5px;
  width: 100%;
`;

export const StyledColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* border:2px solid black; */
  border-radius: 20px;
  /* gap: 5px;
  padding: 5px; */
  width: 100%;
  /* &:hover {
    background-color: yellowgreen;
  } */

  &[data-column-selected="true"] {
    background-color: rgba(150, 80, 200, 0.8);
    backdrop-filter: blur(50px);
  }
`;
