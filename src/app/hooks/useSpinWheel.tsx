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
  const [isRotating, setIsRotating] = useState(false);
  const isStopping = useRef(false);

  let rotationDeg = 20;
  let currentDeg = DEFAULT_VALUES.DEG;

  const init = () => {
    rotationDeg = 20;
    const transformAttr = spinWheelRef.current?.getAttribute("transform");
    const currentSvgDeg =
      transformAttr?.match(/rotate\((.*?)\)/)?.[1] ?? DEFAULT_VALUES.DEG;
    currentDeg = +currentSvgDeg;
  };

  const getWinText = () => {
    if (!arrowRef.current || !winTextRef.current) return;
    const { x, y } = arrowRef.current.getBoundingClientRect();
    const yAxisCoefficient = 10;
    const winText = document
      .elementsFromPoint(x, y + yAxisCoefficient)
      .find((node) => node.nodeName === "circle")
      ?.nextElementSibling?.textContent;
    winTextRef.current.textContent = winText ?? "";
  };

  function animateWheel() {
    getWinText();
    if (!isStopping.current) {
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg;

      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;
      requestAnimationFrame(animateWheel);
      return;
    }

    //멈출때
    if (rotationDeg > 0.2) {
      //16.6ms당 회전각이 윗 값보다 클때
      const randomDecelerationCoefficient = 0.99 + Math.random() * 0.009;
      rotationDeg *= randomDecelerationCoefficient;
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg;

      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;

      requestAnimationFrame(animateWheel);
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

  return { start, stop, isRotating, spinWheelRef, arrowRef, winTextRef };
};

export default useSpinWheel;
