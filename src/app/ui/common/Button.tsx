import { ButtonHTMLAttributes, HTMLAttributes } from "react";

type DefaultColors = "miku" | "rin";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  colorPalette?: DefaultColors;
  className?: string;
}

const Button = ({
  text,
  children,
  colorPalette = "miku",
  className,
  ...rest
}: ButtonProps) => {
  const color: { [key in DefaultColors]: string } = {
    miku: "bg-cyan-500 hover:bg-cyan-400 text-white",
    rin: "bg-yellow-300 hover:bg-yellow-200 text-black",
  };
  return (
    <button
      className={`${color[colorPalette]} w-[100px] h-[30px]  ${className} cursor-pointer  rounded-sm  shadow-md `}
      {...rest}
    >
      {text ? text : children}
    </button>
  );
};

export default Button;
