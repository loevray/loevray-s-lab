import AccordionContextProvider, {
  useAccordionContext,
} from "@/provider/AccordionContextProvider";
import { HTMLAttributes, ReactNode } from "react";
import AccordionSummary from "./AccordionSummary";
import AccordionContent from "./AccordionContent";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  defaultExpanded?: boolean;
}
const Accordion = ({ children, defaultExpanded = false }: AccordionProps) => {
  return (
    <AccordionContextProvider defaultExpanded={defaultExpanded}>
      <div className="text-white p-1">{children}</div>
    </AccordionContextProvider>
  );
};

Accordion.Summary = AccordionSummary;
Accordion.Content = AccordionContent;

export default Accordion;
