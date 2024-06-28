import AccordionContextProvider from "@/app/ui/common/accordion/provider/AccordionContextProvider";
import {
  ComponentProps,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from "react";
import AccordionSummary, { AccordionSummaryType } from "./AccordionSummary";
import AccordionContent from "./AccordionContent";

interface AccordionProps extends ComponentProps<"div"> {
  defaultExpanded?: boolean;
  expanded?: boolean;
  handleToggle?: (e: SyntheticEvent, expanded: boolean) => void;
}

const Accordion = ({
  children,
  expanded,
  defaultExpanded = false,
  handleToggle,
  className,
  ...rest
}: AccordionProps) => {
  return (
    <AccordionContextProvider
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      handleToggle={handleToggle}
    >
      <div className={`bg-white shadow-lg pb-1 ${className}`} {...rest}>
        {children}
      </div>
    </AccordionContextProvider>
  );
};

Accordion.Summary = AccordionSummary;
Accordion.Content = AccordionContent;

export default Accordion;
