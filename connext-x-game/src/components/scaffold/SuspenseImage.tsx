// SuspenseImage.tsx

import loadImage from "@/utils/image";
import { motion, type HTMLMotionProps } from "motion/react";
import React from "react";
// -----------------------------------------------------------------------------
export interface SuspenseImageProps extends HTMLMotionProps<"img"> {
  noTag?: boolean;
}
// -----------------------------------------------------------------------------
const SuspenseImage: React.FC<SuspenseImageProps> = ({
  src,
  noTag,
  ...rest
}) => {
  // ---------------------------------------------------------------------------
  if (!src) return;
  // ---------------------------------------------------------------------------
  loadImage(src); // throws
  // ---------------------------------------------------------------------------
  return noTag === true ? null : <motion.img src={src} {...rest} />;
};
// -----------------------------------------------------------------------------
export default SuspenseImage;
