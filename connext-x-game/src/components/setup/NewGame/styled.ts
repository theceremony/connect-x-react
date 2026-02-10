import styled from "styled-components";
import { StyledModal } from "../../scaffold";
export const StyledNewGame = styled(StyledModal)`
  display: flex;
  gap: 50px;
`;
export const StyledNewGameSection = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  justify-content: center;
`;
export const StyledQRContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  svg {
    border: 20px solid white;
    border-radius: 10px;
  }
`;
export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 300px;
`;
export const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  align-items: center;
  justify-content: center;
  /* border: 1px solid green; */
  width: 100%;
  border-bottom: 1px solid grey;
  padding-bottom: 20px;
  div,
  h1,
  h2,
  h3,
  h4 {
    display: flex;
    /* border: 1px solid green; */
    align-items: center;

    width: max-content;
  }
  &[data-full-span] {
    display: flex;
  }
  &:last-child {
    border: unset;
    padding-bottom: unset;
  }
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
