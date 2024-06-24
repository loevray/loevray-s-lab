import { HTMLAttributes } from "react";

interface CardContentProps extends HTMLAttributes<HTMLElement> {}

const CardContent = ({ children, ...rest }: CardContentProps) => {
  return <div {...rest}>{children}</div>;
};

export default CardContent;
