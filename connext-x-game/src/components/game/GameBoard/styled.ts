import styled from "styled-components";

export const StyledGameBoard = styled.div`
  display: flex;
  width: 60%;
  border: 5px solid grey;
  background-color: whitesmoke;
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
