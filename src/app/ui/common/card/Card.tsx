import Image, { ImageProps } from "next/image";
import { HTMLAttributes } from "react";

const CardImage = ({ ...rest }: ImageProps) => (
  <Image className="object-cover" {...rest} />
);

interface CardContentProps extends HTMLAttributes<HTMLElement> {}

const CardContent = ({ children, ...rest }: CardContentProps) => {
  <div {...rest}>{children}</div>;
};

interface CardHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subTitle?: string;
}
const CardHeader = ({ title, subTitle = "", ...rest }: CardHeaderProps) => {
  return (
    <div {...rest}>
      <h1 className="text-black">{title}</h1>
      <h2 className="text-gray-500">{subTitle}</h2>
    </div>
  );
};

interface CardProps extends HTMLAttributes<HTMLElement> {}
const Card = ({ children }: CardProps) => {
  return <article className="w-25 h-15">{children}</article>;
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Image = CardImage;

export default Card;
