import { motion } from "motion/react";
import styled from "styled-components";
//------------------------------------------------------------------------------
export const StyledApp = styled(motion.div)<{ $backdrop?: string }>`
  display: flex;
  /* flex-direction: column; */
  background: url(${(props) => props.$backdrop});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  align-items: flex-start;
  padding: 1vw;
  width: 100vw;
  height: 100dvh;
  border: 10px solid rgba(255, 255, 255, 1);
  border-radius: 1vw;
  overflow: hidden;
  gap: 5px;
  h1,
  h2,
  h3,
  h4 {
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  transition: background 0.3s;
  transition-delay: 0.2s;
  &[data-is-player] {
    background: unset;
  }
  .logo {
    position: fixed;
    z-index: 200;
    bottom: -6%;
    width: auto;
    max-width: 750px;
    max-height: 30vh;
  }
  perspective: 800px;
`;
//------------------------------------------------------------------------------
export const StyledLogo = styled.img`
  position: fixed;
  z-index: 200;
  bottom: -6%;
  width: auto;
  max-width: 750px;
  max-height: 30vh;
`;
