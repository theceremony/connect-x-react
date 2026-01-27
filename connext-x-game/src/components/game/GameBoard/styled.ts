import styled from "styled-components";
import { StyledModal } from "../../scaffold";
export const StyledGameBoard = styled.div`
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
