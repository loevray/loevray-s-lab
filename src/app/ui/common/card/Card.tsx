import { ComponentProps, HTMLAttributes } from "react";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import CardImage from "./CardImage";
import { twMerge } from "tailwind-merge";

interface CardProps extends ComponentProps<"article"> {}
const Card = ({ children, className, ...rest }: CardProps) => {
  const mergedClass = twMerge(
    "w-30 aspect-video shadow-lg bg-white rounded-2xl",
    className
  );
  return (
    <article className={mergedClass} {...rest}>
      {children}
    </article>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Image = CardImage;

export default Card;
