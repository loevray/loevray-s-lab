import { HTMLAttributes } from "react";

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
export default CardHeader;
