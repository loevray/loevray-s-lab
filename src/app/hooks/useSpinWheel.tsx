import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import { useRef } from "react";

const useSpinWheel = () => {
  const spinWheelRef = useRef<SVGSVGElement>(null);

  let rotationDeg = 20;
  let currentDeg = DEFAULT_VALUES.DEG;
  let isStopping = false; // 멈춤 중인지 여부

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
      rotationDeg *= 0.996; //회전속도 감속
      currentDeg += rotationDeg;
      currentDeg = currentDeg > 270 ? -90 : currentDeg;

      console.log(currentDeg);
      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;

      requestAnimationFrame(animateWheel);
    } else {
      if (spinWheelRef.current)
        spinWheelRef.current.style.transform = `rotate(${currentDeg}deg)`;
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
