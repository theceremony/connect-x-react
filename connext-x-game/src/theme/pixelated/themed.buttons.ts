import { motion } from "motion/react";
import styled from "styled-components";
import { styledMixins } from ".";

export const StyledStandardButton = styled(motion.button)`
  ${styledMixins.pixelatedBorder({
    borderWidth: 5,
    borderOuterColor: "black",
    borderInnerColor: "#00000038",
    borderHighlightColor: "#ffffff36",
  })}
  padding: 0.6em 1.2em;
  font-size: 1.3vw;
  font-weight: 500;
  font-family: inherit;
  background-color: rgb(130, 5, 78);
  background: linear-gradient(0deg, rgb(130, 5, 78), rgb(137, 4, 154));
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
    ${styledMixins.pixelatedBorder({
      borderWidth: 5,
      borderOuterColor: "black",
      borderInnerColor: "#00000038",
      borderHighlightColor: "#646cff",
    })}
    background: linear-gradient(0deg, rgb(167, 64, 236), rgb(64, 90, 243));
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
