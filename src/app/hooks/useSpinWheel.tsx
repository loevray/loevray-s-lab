import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import { useRef, useState } from "react";

interface UseSpinWheelProps {
  onStart?: () => void;
  onStop?: () => void;
}
const useSpinWheel = ({ onStart, onStop }: UseSpinWheelProps) => {
  const spinWheelRef = useRef<SVGSVGElement>(null);
  const arrowRef = useRef<HTMLElement>(null);
  const winTextRef = useRef<HTMLElement>(null);
  const isStopping = useRef(false);
  const requestAnimationFrameId =
    useRef<ReturnType<typeof requestAnimationFrame>>();
  const [isRotating, setIsRotating] = useState(false);

  let rotationDeg = 20;
  let currentDeg = DEFAULT_VALUES.DEG;

  const init = () => {
    const transformAttr = spinWheelRef.current?.getAttribute("transform");
    const currentSvgDeg =
      transformAttr?.match(/rotate\((.*?)\)/)?.[1] ?? DEFAULT_VALUES.DEG;

    rotationDeg = 20;
    currentDeg = +currentSvgDeg;
  };

  const getWinText = () => {
    if (!arrowRef.current || !winTextRef.current) return;
    const { x, y } = arrowRef.current.getBoundingClientRect();
    const yAxisCoefficient = 1;
    const winText = document
      .elementsFromPoint(x, y + yAxisCoefficient)
      .find((node) => node.nodeName === "circle")
      ?.nextElementSibling?.textContent;

    winTextRef.current.textContent = winText || "빈 값";
  };

  function animateWheel() {
    getWinText();
    if (!isStopping.current) {
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg;

      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;
      requestAnimationFrameId.current = requestAnimationFrame(animateWheel);
      return;
    }

    //멈출때
    if (rotationDeg > 0.02) {
      //16.6ms당 회전각이 윗 값보다 클때
      const randomDecelerationCoefficient = 0.99 + Math.random() * 0.009;
      rotationDeg *= randomDecelerationCoefficient;
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg;

      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;

      requestAnimationFrameId.current = requestAnimationFrame(animateWheel);
    } else {
      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;
      onStop?.();
      setIsRotating(false);
      init();
    }
  }

  const start = () => {
    if (!spinWheelRef.current) return;
    onStart?.();
    setIsRotating(true);
    isStopping.current = false;
    animateWheel();
  };

  const stop = () => {
    if (!spinWheelRef.current) return;
    isStopping.current = true;
  };

  const quickStop = () => {
    if (typeof requestAnimationFrameId.current === "number") {
      cancelAnimationFrame(requestAnimationFrameId.current);
      onStop?.();
      setIsRotating(false);
      init();
    }
  };

  return {
    start,
    stop,
    quickStop,
    isRotating,
    spinWheelRef,
    arrowRef,
    winTextRef,
  };
};

export default useSpinWheel;
