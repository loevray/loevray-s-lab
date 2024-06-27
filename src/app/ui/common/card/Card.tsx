import { ComponentProps, HTMLAttributes } from "react";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import CardImage from "./CardImage";

interface CardProps extends ComponentProps<"article"> {}
const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <article
      className={`w-30 h-25 shadow-lg bg-white rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </article>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Image = CardImage;

export default Card;
