import { useAccordionContext } from "@/provider/AccordionContextProvider";
import { HTMLAttributes, ReactNode } from "react";
interface AccordionSummaryProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}
const AccordionSummary = ({
  children,
  icon = "◁",
  ...rest
}: AccordionSummaryProps) => {
  const { expanded, iconRef, onToggle } = useAccordionContext();
  return (
    <summary
      onClick={(e) => {
        onToggle?.(e, !!expanded);
      }}
      className="p-1 cursor-pointer list-none flex justify-between"
      {...rest}
    >
      {children}
      <span ref={iconRef}>{icon}</span>
    </summary>
  );
};

export const AccordionSummaryType = (<AccordionSummary />).type;
export default AccordionSummary;
