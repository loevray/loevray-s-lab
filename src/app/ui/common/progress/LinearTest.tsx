"use client";

import { useEffect, useRef, useState } from "react";
import LinearProgress from "./LinearProgress";

const LinearTest = () => {
  const [progress, setProgress] = useState(100);
  const animationId = useRef<ReturnType<typeof requestAnimationFrame>>();
  const startTime = useRef<number | null>(null);
  const duration = 10000; // 10 seconds

  useEffect(() => {
    const updateProgress = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;

      setProgress(Math.max(100 - (elapsed / duration) * 100, 0));

      if (elapsed < duration) {
        animationId.current = requestAnimationFrame(updateProgress);
      } else {
        cancelAnimationFrame(animationId.current!);
        console.timeEnd("애니메이션 시작");
      }
    };

    animationId.current = requestAnimationFrame(updateProgress);
    console.time("애니메이션 시작");

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [duration]);
  return <LinearProgress value={progress} />;
};

export default LinearTest;
