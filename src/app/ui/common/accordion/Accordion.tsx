import AccordionContextProvider, {
  useAccordionContext,
} from "@/provider/AccordionContextProvider";
import { HTMLAttributes, SyntheticEvent } from "react";
import AccordionSummary from "./AccordionSummary";
import AccordionContent from "./AccordionContent";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
  expanded?: boolean;
  handleToggle?: (e: SyntheticEvent, expanded: boolean) => void;
}

const Accordion = ({
  children,
  expanded,
  defaultExpanded = false,
  handleToggle,
  ...rest
}: AccordionProps) => {
  return (
    <AccordionContextProvider
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      handleToggle={handleToggle}
    >
      <div className="text-white p-1" {...rest}>
        {children}
      </div>
    </AccordionContextProvider>
  );
};

Accordion.Summary = AccordionSummary;
Accordion.Content = AccordionContent;

export default Accordion;
