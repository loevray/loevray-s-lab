"use client";

import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

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
    miku: "bg-cyan-500 hover:bg-cyan-400 text-white disabled:cursor-not-allowed disabled:bg-cyan-600",
    rin: "bg-yellow-300 hover:bg-yellow-200 disabled:bg-yellow-600 disabled:cursor-not-allowed text-amber-950",
  };
  const mergedClass = twMerge("w-10 h-3", className);
  return (
    <button
      className={`${color[colorPalette]} ${mergedClass} cursor-pointer  rounded-sm  shadow-md`}
      {...rest}
    >
      {text ? text : children}
    </button>
  );
};

export default Button;
