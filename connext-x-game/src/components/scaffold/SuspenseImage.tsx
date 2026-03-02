// SuspenseImage.tsx

import loadImage from "@/utils/imageLoader";
import { motion, type HTMLMotionProps } from "motion/react";
import React from "react";

interface SuspenseImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  noTag?: boolean;
}

const SuspenseImage: React.FC<SuspenseImageProps> = ({
  src,
  alt,
  noTag,
  ...rest
}) => {
  loadImage(src); // This will throw a promise and suspend the component until the image is loaded

  return noTag === true ? null : <motion.img src={src} alt={alt} {...rest} />;
};

export default SuspenseImage;
