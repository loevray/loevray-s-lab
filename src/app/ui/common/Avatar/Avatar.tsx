import Image, { ImageProps } from "next/image";

interface AvatarProps extends ImageProps {}

const Avatar = ({ className, ...rest }: AvatarProps) => {
  return <Image className={`rounded-full size-4 ${className}`} {...rest} />;
};

export default Avatar;
