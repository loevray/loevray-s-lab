import { useEffect, useRef, useState } from "react";

const useHover = () => {
  const [isHover, setIsHover] = useState(false);
  const hoverRef = useRef<HTMLElement>(null);

  const onMouseEnter = (e: MouseEvent) => setIsHover(true);

  const onMouseLeave = (e: MouseEvent) => setIsHover(false);

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
  return { isHover, hoverRef };
};

export default useHover;
