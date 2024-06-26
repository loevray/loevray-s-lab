import { RefObject, useEffect } from "react";

interface UseClickAwayProps {
  clickAwayRef: RefObject<HTMLElement>;
  onClickAway: () => void;
  clickAwayCondition?: (e: MouseEvent, element: HTMLElement) => boolean;
}

const useClickAway = ({
  clickAwayRef,
  onClickAway,
  clickAwayCondition,
}: UseClickAwayProps) => {
  const handleClickAway = (e: MouseEvent) => {
    const element = clickAwayRef.current;
    if (!element) return;

    if (clickAwayCondition?.(e, element)) {
      onClickAway();
      return;
    }

    if (!element.contains(e.target as Node)) {
      onClickAway();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickAway);
    return () => document.body.removeEventListener("click", handleClickAway);
  }, [clickAwayRef]);
};

export default useClickAway;
