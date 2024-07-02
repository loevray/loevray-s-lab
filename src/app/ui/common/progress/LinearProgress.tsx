import { ComponentProps } from "react";

interface LinearProgressProps extends ComponentProps<"span"> {
  value: number;
}

const LinearProgress = ({
  value,

  ...rest
}: LinearProgressProps) => {
  const currentX = -Math.max(100 - value, 0).toFixed(1);
  return (
    <span
      {...rest}
      className="w-full block relative overflow-hidden h-1 bg-cyan-200"
    >
      <span
        className="bg-cyan-500 block absolute left-0 top-0 w-full ease-linear h-full transition-transform"
        style={{
          transform: `translateX(${currentX}%)`,
        }}
      ></span>
    </span>
  );
};

export default LinearProgress;
