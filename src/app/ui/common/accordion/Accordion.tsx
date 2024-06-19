import { Container } from "postcss";
import { SyntheticEvent } from "react";

interface AccordionSummaryProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}
const AccordionSummary = ({ children, icon = "◁" }: AccordionSummaryProps) => (
  <summary className="cursor-pointer list-none flex justify-between">
    {children}
    <span>{icon}</span>
  </summary>
);

interface AccordionSummaryProps {
  children: React.ReactNode;
}
const AccrodionContent = ({ children }: AccordionSummaryProps) => (
  <div>{children}</div>
);

interface AccordionContainerProps {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  onChange?: (e: SyntheticEvent<HTMLDetailsElement>) => void;
}

const AccordionContainer = ({
  children,
  defaultExpanded = false,
  onChange,
}: AccordionContainerProps) => {
  return (
    <details
      className="text-white p-1"
      open={defaultExpanded}
      onToggle={(e) => {
        onChange?.(e);
        //context.provider에서 icon에대한 ref를 가져와서 회전시켜준다
      }}
    >
      {children}
    </details>
  );
};
const Accordion = Object.assign(AccordionContainer, {
  Summary: AccordionSummary,
  Content: AccrodionContent,
});

/* 
  1. 제어-비제어 컴포넌트가 가능해야한다.
  2. compound패턴을 사용한다.
*/
export default Accordion;
