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
  const { expanded, onToggle } = useAccordionContext();
  return (
    <summary
      onClick={(e) => {
        onToggle?.(e, !!expanded);
      }}
      className="p-1 cursor-pointer list-none flex justify-between"
      {...rest}
    >
      {children}
      <span className={`${expanded ? "rotate-[-90deg]" : "rotate-0"}`}>
        {icon}
      </span>
    </summary>
  );
};

export const AccordionSummaryType = (<AccordionSummary />).type;
export default AccordionSummary;
