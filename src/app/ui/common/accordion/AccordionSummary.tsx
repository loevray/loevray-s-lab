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
  const { typeAChildren: accordionContentChildren, restChildren } =
    divideChildrenTwoTypes(children, AccordionContentType);
  return (
    <details
      open={expanded}
      onToggle={(e) => {
        onToggle?.(e);
      }}
    >
      <summary className="cursor-pointer list-none flex justify-between">
        {restChildren}
        <span ref={iconRef}>{icon}</span>
      </summary>
      {accordionContentChildren}
    </details>
  );
};

export default AccordionSummary;
