import styled from "styled-components";
import { StyledModal } from "../../scaffold";
export const StyledNewGame = styled(StyledModal)`
  display: flex;
`;
export const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
  /* border: 1px solid green; */
  width: 100%;
  max-width: 200px;
`;
export const StyledLabel = styled.label`
  font-size: 20px;
`;

export const StyledInput = styled.input`
  font-size: 20px;
  text-align: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
`;
export const StyledButton = styled.button`
  width: 100%;
`;
