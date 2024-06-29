import { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Avatar = ({ className, ...rest }: AvatarProps) => {
  return <img className={`rounded-full size-4 ${className}`} {...rest} />;
};

export default Avatar;
