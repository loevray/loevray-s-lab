import { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  width?: string;
  height?: string;
}

const Button = ({
  text,
  children,
  width = "w-[100px]",
  height = "h-[30px]",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`bg-cyan-500 cursor-pointer hover:bg-cyan-400 rounded-sm text-white shadow-md ${width} ${height}`}
      {...rest}
    >
      {text ? text : children}
    </button>
  );
};

export default Button;
