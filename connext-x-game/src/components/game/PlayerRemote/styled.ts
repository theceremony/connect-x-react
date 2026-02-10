import { StyledSlot } from "@/components/scaffold";
import styled from "styled-components";

export const StyledPlayer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;
export const StyledSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  /* border: 1px solid green; */
  gap: 10px;
  align-items: center;
`;
export const StyledPlayerPiece = styled(StyledSlot)`
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.6);
`;
export const StyledPlayerName = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;
export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 300px;
`;

export const StyledDirectionButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: azure;
  width: 100%;

  border-radius: 30px;
  padding: 30px;
  font-size: 20px;
  font-weight: 900;
  color: #000;
  border: 10px solid grey;
  &:hover {
    background-color: grey;
    border: 10px solid white;
  }
`;
