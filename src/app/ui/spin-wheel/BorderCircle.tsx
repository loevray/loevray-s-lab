import { ComponentProps } from "react";

const BorderCircle = ({
  diameter,
  className,
  scale = 1.1,
  borderWidth = 1,
}: {
  diameter: number;
  scale?: number;
  className?: ComponentProps<"circle">["className"];
  borderWidth?: number;
}) => {
  return (
    <svg
      viewBox={`0 0 ${diameter * scale} ${diameter * scale}`}
      width={diameter * scale}
      height={diameter * scale}
      className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]"
    >
      <circle
        r={diameter / (2 - borderWidth / 100)}
        cx="50%"
        cy="50%"
        className={`fill-cyan-400 ${className}`}
      />
    </svg>
  );
};

export default BorderCircle;
