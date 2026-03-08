import { css } from "styled-components";

type PixelatedBorderProps = {
  borderWidth: number;
  borderOuterColor: string;
  borderInnerColor: string;
  borderHighlightColor: string;
  boxShadow?: string;
};

const pixelatedBorder = ({
  borderWidth,
  borderHighlightColor,
  borderInnerColor,
  borderOuterColor,
  boxShadow,
}: PixelatedBorderProps) => css`
  border: 1px solid transparent;
  box-shadow:
    0px ${borderWidth}px ${borderOuterColor},
    0px -${borderWidth}px ${borderOuterColor},
    ${borderWidth}px 0px ${borderOuterColor},
    -${borderWidth}px 0px ${borderOuterColor},
    0px ${borderWidth * 2}px ${borderInnerColor},
    ${borderWidth}px ${borderWidth}px ${borderInnerColor},
    -${borderWidth}px ${borderWidth}px ${borderInnerColor},
    inset 0px ${borderWidth}px
      ${borderHighlightColor}${boxShadow ? `,${boxShadow};` : ""};
`;

export const styledMixins = {
  pixelatedBorder,
};
