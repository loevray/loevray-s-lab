import { useEffect, useRef, useState } from "react";
import LinearProgress from "./LinearProgress";

interface DecreaseProgressProps {
  duration?: number;
  colorSet?: string;
  onComplete?: () => void;
  shouldPause?: boolean;
}

const DecreaseProgress = ({
  duration = 3000,
  colorSet,
  onComplete,
  shouldPause = false,
}: DecreaseProgressProps) => {
  return (
    <span className={`w-full block relative overflow-hidden h-0.5 `}>
      <span
        style={{
          animationDuration: `${duration}ms`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
          animationPlayState: `${shouldPause ? "paused" : "running"}`,
        }}
        className={`${colorSet} block absolute left-0 top-0 w-full  h-full animate-decrease-progress`}
        onAnimationEnd={() => onComplete?.()}
      ></span>
    </span>
  );
};

export default DecreaseProgress;
