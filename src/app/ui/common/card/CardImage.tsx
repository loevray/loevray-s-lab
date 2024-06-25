import { HTMLAttributes, ImgHTMLAttributes } from "react";

const CardImage = ({ ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
  <img className="object-cover rounded-2xl aspect-video" {...rest} />
);
export default CardImage;
