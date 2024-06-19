import AccordionContextProvider, {
  useAccordionContext,
} from "@/provider/AccordionContextProvider";
import {
  Children,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
  isValidElement,
} from "react";

const AccrodionContent = ({ children }: { children?: ReactNode }) => (
  <div>{children}</div>
);

const AccordionContentType = (<AccrodionContent />).type;

interface AccordionSummaryProps {
  children: ReactNode;
  icon?: ReactNode;
  onChange?: (e: SyntheticEvent<HTMLDetailsElement>) => void;
}

const divideAccordionChildren = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  const accordionContentChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type === AccordionContentType
  );
  const restChildren = childrenArray.filter(
    (child) => !accordionContentChildren.includes(child)
  );
  return { accordionContentChildren, restChildren };
};

const AccordionSummary = ({ children, icon = "◁" }: AccordionSummaryProps) => {
  const { expanded, iconRef, onToggle } = useAccordionContext();
  const { accordionContentChildren, restChildren } =
    divideAccordionChildren(children);
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
interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  defaultExpanded: boolean;
}
const Accordion = ({ children, defaultExpanded }: AccordionProps) => {
  return (
    <AccordionContextProvider defaultExpanded={defaultExpanded}>
      <div className="text-white p-1">{children}</div>
    </AccordionContextProvider>
  );
};

Accordion.Summary = AccordionSummary;
Accordion.Content = AccrodionContent;

export default Accordion;
