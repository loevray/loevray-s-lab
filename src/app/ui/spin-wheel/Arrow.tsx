import { ComponentProps } from "react";

const Arrow = ({ className }: ComponentProps<"polygon">) => {
  return (
    <svg
      className="absolute left-1/2 top-[-1rem] translate-x-[-50%] z-10"
      width="45"
      height="45"
      viewBox="0 0 100 100"
    >
      <polygon
        points="50,100 25,0 75,0"
        className={`fill-slate-800 ${className}`}
      />
    </svg>
  );
};

export default Arrow;
