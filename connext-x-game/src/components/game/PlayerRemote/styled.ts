import { StyledSlot } from "@/components/scaffold";
import styled from "styled-components";

export const StyledPlayer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
`;
export const StyledPlayerName = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;
