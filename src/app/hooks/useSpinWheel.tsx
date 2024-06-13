import { useRef } from "react";

const useSpinWheel = () => {
  const spinWheelRef = useRef<SVGSVGElement>(null);
  const start = () => {
    if (!spinWheelRef.current) return;
    spinWheelRef.current.classList.add("animate-spinwheel");
  };
  const stop = () => {
    if (!spinWheelRef.current) return;
    spinWheelRef.current.classList.remove("animate-spinwheel");
  };
  return { start, stop, spinWheelRef };
};

export default useSpinWheel;
