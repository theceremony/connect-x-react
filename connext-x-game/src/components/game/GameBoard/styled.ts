import { motion } from "motion/react";
import styled from "styled-components";

export const StyledGameBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 60%;

  justify-content: center;
  align-items: center;
`;

export const StyledGameBoard = styled(motion.div)`
  display: flex;

  width: 100%;
  /* border: 5px solid grey; */
  background-color: rgb(220, 220, 220);
  border-radius: 40px;
  padding: 15px;
  /* gap:5px; */
  box-shadow: -15px -5px 0px 0px white;
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
    background-color: yellowgreen;
  }
`;
