import { useEffect, useRef, useState } from "react";
import LinearProgress from "./LinearProgress";

interface DecreaseProgressProps {
  duration?: number;
  colorSet?: string;
  onComplete?: () => void;
}

const DecreaseProgress = ({
  duration = 3000,
  colorSet,
  onComplete,
}: DecreaseProgressProps) => {
  return (
    <span className="w-full block relative overflow-hidden h-1 bg-cyan-200">
      <span
        style={{
          animationDuration: `${duration}ms`,
          animationTimingFunction: "linear",
        }}
        className="bg-cyan-500 block absolute left-0 top-0 w-full  h-full animate-decrease-progress"
        onAnimationEnd={() => onComplete?.()}
      ></span>
    </span>
  );
};

export default DecreaseProgress;
