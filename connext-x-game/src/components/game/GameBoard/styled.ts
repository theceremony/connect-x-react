import { motion } from "motion/react";
import styled from "styled-components";

export const StyledGameBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 2000px;
  padding: 25vw;
  justify-content: center;
  align-items: center;
`;

export const StyledGameBoard = styled(motion.div)`
  display: flex;

  width: 100%;
  /* border: 5px solid grey; */
  background: #808080;
  background: #c7c7c7;
  background: linear-gradient(
    180deg,
    rgba(199, 199, 199, 1) 1%,
    rgba(201, 201, 201, 1) 22%,
    rgba(184, 184, 184, 1) 50%,
    rgba(153, 153, 153, 1) 100%
  );
  border-radius: 40px;
  padding: 15px;
  /* gap:5px; */
  box-shadow: -15px -5px 0px 0px rgb(132, 132, 132);
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
    background-color: yellowgreen;
  }
`;
