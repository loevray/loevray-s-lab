import Image, { ImageProps } from "next/image";

const CardImage = ({ ...rest }: ImageProps) => (
  <Image className="object-cover rounded-2xl aspect-video" {...rest} />
);
export default CardImage;
