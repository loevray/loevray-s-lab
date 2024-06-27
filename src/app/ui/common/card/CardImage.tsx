import { HTMLAttributes, ImgHTMLAttributes } from "react";

const CardImage = ({
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    className={`object-cover rounded-2xl aspect-video ${className}`}
    {...rest}
  />
);
export default CardImage;
