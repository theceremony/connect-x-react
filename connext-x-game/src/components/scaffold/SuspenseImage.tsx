// SuspenseImage.tsx

import loadImage from "@/utils/imageLoader";
import React, { type DetailedHTMLProps, type ImgHTMLAttributes } from "react";

interface SuspenseImageProps extends DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> {
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

  return noTag === true ? null : <img src={src} alt={alt} {...rest} />;
};

export default SuspenseImage;
