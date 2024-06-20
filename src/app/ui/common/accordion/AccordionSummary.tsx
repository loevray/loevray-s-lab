import { useAccordionContext } from "@/provider/AccordionContextProvider";
import divideChildrenTwoTypes from "./divideChildrenTwoTypes";
import { ReactNode, SyntheticEvent } from "react";
import { AccordionContentType } from "./AccordionContent";
interface AccordionSummaryProps {
  children: ReactNode;
  icon?: ReactNode;
  onChange?: (e: SyntheticEvent<HTMLDetailsElement>) => void;
}
const AccordionSummary = ({ children, icon = "◁" }: AccordionSummaryProps) => {
  const { expanded, iconRef, onToggle } = useAccordionContext();
  return (
    <summary
      onClick={(e) => {
        onToggle?.(e, !!expanded);
      }}
      className="cursor-pointer list-none flex justify-between"
    >
      {children}
      <span ref={iconRef}>{icon}</span>
    </summary>
  );
};

export default AccordionSummary;
