import { RefObject, useEffect, useRef, useState } from "react";

interface UseHoverProps {
  hoverRef: RefObject<HTMLElement>;
}
const useHover = ({ hoverRef }: UseHoverProps) => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = (e: MouseEvent) => {
    console.log("mouse enter");
    setIsHover(true);
  };

  const onMouseLeave = (e: MouseEvent) => {
    console.log("mouse leave");
    setIsHover(false);
  };

  useEffect(() => {
    if (!hoverRef.current) return;

    hoverRef.current.addEventListener("mouseenter", onMouseEnter);
    hoverRef.current.addEventListener("mouseleave", onMouseLeave);
    return () => {
      if (!hoverRef.current) return;

      hoverRef.current.removeEventListener("mouseenter", onMouseEnter);
      hoverRef.current.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);
  return { isHover };
};

export default useHover;
