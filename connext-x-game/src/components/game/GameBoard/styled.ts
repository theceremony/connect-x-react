import { motion } from "motion/react";
import styled from "styled-components";

export const StyledGameBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 2200px;
  padding: 25vw;
  justify-content: center;
  align-items: center;
`;

export const StyledGameBoard = styled(motion.div)`
  display: flex;

  width: 100%;
  /* border: 5px solid grey; */
  background-color: rgba(180, 100, 100, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 40px;
  padding: 15px;
  border: 2px solid white;
  /* gap:5px; */
  box-shadow: -15px -5px 0px 0px rgb(50, 50, 50, 0.8);
  /* opacity: 0.9; */
`;

export const StyledColumnSelectContainer = styled(motion.div)`
  display: flex;

  width: 100%;
  padding: 15px;
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
  gap: 5px;
  padding: 5px;
  width: 100%;
  /* &:hover {
    background-color: yellowgreen;
  } */

  &[data-column-selected="true"] {
    background-color: rgba(0, 250, 150, 0.4);
    backdrop-filter: blur(50px);
    border: 3px solid rgba(0, 250, 150, 0.8);
  }
`;
