import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import { useRef } from "react";

const useSpinWheel = () => {
  const spinWheelRef = useRef<SVGSVGElement>(null);

  let rotationDeg = 20;
  let currentDeg = DEFAULT_VALUES.DEG;
  let isStopping = false; // 멈춤 중인지 여부

  const init = () => {
    rotationDeg = 20;
    const transformAttr = spinWheelRef.current?.getAttribute("transform");
    const currentSvgDeg =
      transformAttr?.match(/rotate\((.*?)\)/)?.[1] ?? DEFAULT_VALUES.DEG;
    currentDeg = +currentSvgDeg;
  };
  function animateWheel() {
    if (!isStopping) {
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg; // 360도 넘어가면 다시 0부터 시작

      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;

      requestAnimationFrame(animateWheel);
      return;
    }

    //멈출때
    if (rotationDeg > 0.2) {
      //16.6ms당 회전각이 윗 값보다 클때
      const randomDecelerationCoefficient = 0.99 + Math.random() * 0.009;
      console.log(randomDecelerationCoefficient);
      rotationDeg *= randomDecelerationCoefficient;
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg;

      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;

      requestAnimationFrame(animateWheel);
    } else {
      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;
      init();
    }
  }
  const start = () => {
    if (!spinWheelRef.current) return;
    isStopping = false;
    animateWheel();
  };
  const stop = () => {
    if (!spinWheelRef.current) return;
    isStopping = true;
  };
  return { start, stop, spinWheelRef };
};

export default useSpinWheel;
